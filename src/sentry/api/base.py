from __future__ import absolute_import

__all__ = ['DocSection', 'Endpoint', 'StatsMixin']

import time

from datetime import datetime, timedelta
from django.conf import settings
from django.utils.http import urlquote
from django.views.decorators.csrf import csrf_exempt
from enum import Enum
from pytz import utc
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from sentry.models.user import User
from sentry.app import raven, tsdb
from sentry.models import ApiKey, AuditLogEntry
from sentry.models.organization import Organization
from sentry.models.organizationmember import OrganizationMember
from sentry.utils.cursors import Cursor
from sentry.utils.http import absolute_uri, is_valid_origin
from sentry import roles
from django.core.exceptions import ObjectDoesNotExist

from .authentication import ApiKeyAuthentication, ProjectKeyAuthentication
from .paginator import Paginator
from .permissions import NoPermission
import requests

ONE_MINUTE = 60
ONE_HOUR = ONE_MINUTE * 60
ONE_DAY = ONE_HOUR * 24

LINK_HEADER = '<{uri}&cursor={cursor}>; rel="{name}"; results="{has_results}"; cursor="{cursor}"'

DEFAULT_AUTHENTICATION = (
    ApiKeyAuthentication,
    ProjectKeyAuthentication,
    SessionAuthentication
)


class DocSection(Enum):
    ACCOUNTS = 'Accounts'
    EVENTS = 'Events'
    ORGANIZATIONS = 'Organizations'
    HOSTS = 'Hosts'
    STREAMS = 'Streams'
    PROJECTS = 'Projects'
    RELEASES = 'Releases'
    TEAMS = 'Teams'


class Endpoint(APIView):
    authentication_classes = DEFAULT_AUTHENTICATION
    renderer_classes = (JSONRenderer,)
    parser_classes = (JSONParser,)
    permission_classes = (NoPermission,)
    INVALID_ACCESS_TOKEN = -1

    def parse_path(self, request, pattern, arg):
        path = request.path
        m = pattern.search(path)
        if m:
            return m.group(arg)

    def validate_accesstoken(self, authorization, request):
        headers = {'Authorization': authorization}
        url = settings.OAUTH_SERVER + "/api/0/access_token"
        r = requests.get(url, headers=headers)
        if r.status_code == 200:
            user_id = r.json()['user_id']
            if not User.objects.filter(id=user_id):
                # get user
                resp = requests.post(settings.OAUTH_SERVER + "/api/user_info", data={'token': authorization.split(" ")[1]}, headers=headers)
                print 'data = ', resp.json()
                data = resp.json()[0]['fields']
                # sync user
                try:
                    user = User.objects.get(username=data['username'])
                    return user.id
                except ObjectDoesNotExist:
                    user = User.objects.create(id=user_id, username=data['username'], password=data['password'], email=data['email'])
                    user_id = user.id
                data1 = resp.json()[1]['fields']

                try:
                    Organization.objects.get(name=data['org_name'])
                except ObjectDoesNotExist:
                    org = Organization.objects.create(
                        name=data1['org_name'],
                        slug=data1['org_name'],
                    )

                    OrganizationMember.objects.create(
                        user=user,
                        organization=org,
                        role=roles.get_top_dog().id,
                    )

            return user_id
        return -1

    def build_cursor_link(self, request, name, cursor):
        querystring = u'&'.join(
            u'{0}={1}'.format(urlquote(k), urlquote(v))
            for k, v in request.GET.iteritems()
            if k != 'cursor'
        )
        base_url = absolute_uri(request.path)
        if querystring:
            base_url = '{0}?{1}'.format(base_url, querystring)
        else:
            base_url = base_url + '?'

        return LINK_HEADER.format(
            uri=base_url,
            cursor=str(cursor),
            name=name,
            has_results='true' if bool(cursor) else 'false',
        )

    def convert_args(self, request, *args, **kwargs):
        return (args, kwargs)

    def handle_exception(self, request, exc):
        try:
            return super(Endpoint, self).handle_exception(exc)
        except Exception as exc:
            import sys
            import traceback
            sys.stderr.write(traceback.format_exc())
            event = raven.captureException(request=request)
            if event:
                event_id = raven.get_ident(event)
            else:
                event_id = None
            context = {
                'detail': 'Internal Error',
                'errorId': event_id,
            }
            return Response(context, status=500)

    def create_audit_entry(self, request, **kwargs):
        user = request.user if request.user.is_authenticated() else None
        api_key = request.auth if isinstance(request.auth, ApiKey) else None

        AuditLogEntry.objects.create(
            actor=user,
            actor_key=api_key,
            ip_address=request.META['REMOTE_ADDR'],
            **kwargs
        )

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        """
        Identical to rest framework's dispatch except we add the ability
        to convert arguments (for common URL params).
        """
        self.args = args
        self.kwargs = kwargs
        request = self.initialize_request(request, *args, **kwargs)
        self.request = request
        self.headers = self.default_response_headers  # deprecate?

        if settings.SENTRY_API_RESPONSE_DELAY:
            time.sleep(settings.SENTRY_API_RESPONSE_DELAY / 1000.0)

        try:
            self.initial(request, *args, **kwargs)
            # Get the appropriate handler method
            if request.method.lower() in self.http_method_names:
                handler = getattr(self, request.method.lower(),
                                  self.http_method_not_allowed)

                (args, kwargs) = self.convert_args(request, *args, **kwargs)
                self.args = args
                self.kwargs = kwargs
            else:
                handler = self.http_method_not_allowed

            response = handler(request, *args, **kwargs)
        except Exception as exc:
            response = self.handle_exception(request, exc)
        self.response = self.finalize_response(request, response, *args, **kwargs)
        return self.response

    def finalize_response(self, request, response, *args, **kwargs):
        response = super(Endpoint, self).finalize_response(
            request, response, *args, **kwargs
        )

        self.add_cors_headers(request, response)

        return response

    def add_cors_headers(self, request, response):
        if not request.auth:
            return

        origin = request.META.get('HTTP_ORIGIN')
        if not origin:
            return

        allowed_origins = request.auth.get_allowed_origins()
        if is_valid_origin(origin, allowed=allowed_origins):
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Methods'] = ', '.join(self.http_method_names)

        return

    def paginate(self, request, on_results=None, paginator_cls=Paginator,
                 default_per_page=100, **kwargs):
        per_page = int(request.GET.get('per_page', default_per_page))
        input_cursor = request.GET.get('cursor')
        if input_cursor:
            input_cursor = Cursor.from_string(input_cursor)
        else:
            input_cursor = None

        assert per_page <= max(100, default_per_page)

        paginator = paginator_cls(**kwargs)
        cursor_result = paginator.get_result(
            limit=per_page,
            cursor=input_cursor,
        )

        # map results based on callback
        if on_results:
            results = on_results(cursor_result.results)

        headers = {}
        headers['Link'] = ', '.join([
            self.build_cursor_link(request, 'previous', cursor_result.prev),
            self.build_cursor_link(request, 'next', cursor_result.next),
        ])

        return Response(results, headers=headers)


class StatsMixin(object):
    def _parse_args(self, request):
        resolution = request.GET.get('resolution')
        if resolution:
            resolution = self._parse_resolution(resolution)

            assert any(r for r in tsdb.rollups if r[0] == resolution)

        end = request.GET.get('until')
        if end:
            end = datetime.fromtimestamp(float(end)).replace(tzinfo=utc)
        else:
            end = datetime.utcnow().replace(tzinfo=utc)

        start = request.GET.get('since')
        if start:
            start = datetime.fromtimestamp(float(start)).replace(tzinfo=utc)
        else:
            start = end - timedelta(days=1, seconds=-1)

        return {
            'start': start,
            'end': end,
            'rollup': resolution,
        }

    def _parse_resolution(self, value):
        if value.endswith('h'):
            return int(value[:-1]) * ONE_HOUR
        elif value.endswith('d'):
            return int(value[:-1]) * ONE_DAY
        elif value.endswith('m'):
            return int(value[:-1]) * ONE_MINUTE
        elif value.endswith('s'):
            return int(value[:-1])
        else:
            raise ValueError(value)
