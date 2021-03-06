from __future__ import absolute_import

from rest_framework.response import Response

import sentry
from sentry import options
from sentry.api.base import Endpoint
from sentry.api.permissions import SuperuserPermission

from django.conf import settings


class SystemOptionsEndpoint(Endpoint):
    permission_classes = (SuperuserPermission,)

    def get(self, request):
        results = {}
        for k in options.filter(flag=options.FLAG_REQUIRED):
            # TODO(mattrobenolt): Expose this as a property on Key.
            diskPriority = bool(k.flags & options.FLAG_PRIORITIZE_DISK and settings.SENTRY_OPTIONS.get(k.name))
            # TODO(mattrobenolt): help, placeholder, title, type
            results[k.name] = {
                'value': options.get(k.name),
                'field': {
                    'default': k.default,
                    'required': bool(k.flags & options.FLAG_REQUIRED),
                    # We're disabled if the disk has taken priority
                    'disabled': diskPriority,
                    'disabledReason': 'diskPriority' if diskPriority else None,
                }
            }

        return Response(results)

    def put(self, request):
        # TODO(dcramer): this should validate options before saving them
        for k, v in request.DATA.iteritems():
            try:
                options.set(k, v)
            except options.UnknownOption:
                # TODO(dcramer): unify API errors
                return Response({
                    'error': 'unknown_option',
                    'errorDetail': {
                        'option': k,
                    },
                }, status=400)
        options.set('sentry:version-configured', sentry.get_version())
        return Response(status=200)
