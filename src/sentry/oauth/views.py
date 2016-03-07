from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import FormView, TemplateView
from oauth2_provider.compat import urlencode
from oauth2_provider.views.generic import ProtectedResourceView
from sentry.models.user import User
from django.contrib.auth import login, authenticate
from django.core.urlresolvers import reverse
from sentry.utils.auth import get_login_redirect
from django.shortcuts import redirect
from sentry.models.organization import Organization
from sentry.models.organizationmember import OrganizationMember
from sentry import roles
import base64
import requests
from .forms import ConsumerForm, ConsumerExchangeForm, AccessTokenDataForm
from django.conf import settings
from collections import namedtuple
import hashlib

ApiUrl = namedtuple('ApiUrl', 'name, url')


class ConsumerExchangeView(FormView):
    """
    The exchange view shows a form to manually perform the auth token swap
    """
    form_class = ConsumerExchangeForm
    template_name = 'example/consumer-exchange.html'

    def generate_user_key(self, username, email, password):
        data = username + email + password
        hash_md5 = hashlib.md5(data)
        return hash_md5.hexdigest()

    def get(self, request, *args, **kwargs):
        try:
            print request.GET
            self.initial = {
                'code': request.GET['code'],
                'state': request.GET['state'],
                'client_id': settings.LOGINSIGHT_CLIENT_ID,
                'client_secret': settings.LOGINSIGHT_CLIENT_SECRET,
                'token_url': settings.TOKEN_URL,
                'redirect_url': request.build_absolute_uri(reverse('oauth-consumer-exchange'))
            }
            headers = {"Authorization": "Basic " + base64.b64encode(settings.LOGINSIGHT_CLIENT_ID + ":" + settings.LOGINSIGHT_CLIENT_SECRET)}
            data = {'code': request.GET['code'],
                    'redirect_uri': request.build_absolute_uri(reverse('oauth-consumer-exchange')),
                    'grant_type': 'authorization_code'}
            resp = requests.post(settings.TOKEN_URL,
                                 data=data,
                                 headers=headers
                                 )
            data = resp.json()
            token = data['access_token']
            token_type = data['token_type']
            headers = {"Authorization": token_type + " " + token}

            resp = requests.post(settings.OAUTH_SERVER + "/api/user_info", data={'token': token}, headers=headers)
            data = resp.json()[0]['fields']
            user_key = self.generate_user_key(data['username'], data['email'], data['password'])
            user = User(username=data['username'], email=data['email'])
            user.password = data['password']
            user.userkey = user_key
            user.is_active = True
            user.is_managed = True
            user.is_staff = True

            if not User.objects.filter(username=data['username']):
                if not User.objects.filter(email=data['email']):
                    user.save()
            user = User.objects.get(username=data['username'])
            data = resp.json()[1]['fields']
            org_name = data['org_name']
            # create organization

            if len( Organization.objects.filter(name=org_name)) == 0:
                org = Organization.objects.create(
                    name=org_name,
                    slug=org_name,
                )

                OrganizationMember.objects.create(
                    organization=org,
                    user=user,
                    role=roles.get_top_dog().id,
                )

            if request.user.is_authenticated():
                # Do something for authenticated users.
                return redirect('sentry-organization-home')
            else:
                # Do something for anonymous users.

                user = authenticate(username=data['name'], password=data['password'])

                if user is None:
                    return redirect('sentry-login')
                login(request, user)
                return HttpResponseRedirect(get_login_redirect(request))
        except KeyError:
            kwargs['noparams'] = True

        form_class = self.get_form_class()
        form = self.get_form(form_class)
        return self.render_to_response(self.get_context_data(form=form, **kwargs))


class ConsumerView(FormView):
    """
    The homepage to access Consumer's functionalities in the case of Authorization Code flow.
    It offers a form useful for building "authorization links"
    """
    form_class = ConsumerForm
    success_url = '/oauth/consumer/'
    template_name = 'example/consumer.html'

    def __init__(self, **kwargs):
        self.authorization_link = None
        super(ConsumerView, self).__init__(**kwargs)

    def get_success_url(self):
        url = super(ConsumerView, self).get_success_url()
        return '{url}?{qs}'.format(url=url, qs=urlencode({'authorization_link': self.authorization_link}))

    def get(self, request, *args, **kwargs):
        kwargs['authorization_link'] = request.GET.get('authorization_link', None)

        form_class = self.get_form_class()
        form = self.get_form(form_class)
        return self.render_to_response(self.get_context_data(form=form, **kwargs))

    def post(self, request, *args, **kwargs):
        return super(ConsumerView, self).post(request, *args, **kwargs)

    def form_valid(self, form):
        qs = urlencode({
            'client_id': form.cleaned_data['client_id'],
            'response_type': 'code',
            'state': 'random_state_string',
        })
        self.authorization_link = "{url}?{qs}".format(url=form.cleaned_data['authorization_url'], qs=qs)
        return super(ConsumerView, self).form_valid(form)


class ConsumerDoneView(TemplateView):
    """
    If exchange succeeded, come here, show a token and let users use the refresh token
    """
    template_name = 'example/consumer-done.html'

    def get(self, request, *args, **kwargs):
        # do not show form when url is accessed without paramters
        if 'access_token' in request.GET:
            form = AccessTokenDataForm(initial={
                'access_token': request.GET.get('access_token', None),
                'token_type': request.GET.get('token_type', None),
                'expires_in': request.GET.get('expires_in', None),
                'refresh_token': request.GET.get('refresh_token', None),
            })
            kwargs['form'] = form
        return super(ConsumerDoneView, self).get(request, *args, **kwargs)


class ApiClientView(TemplateView):
    """
    TODO
    """
    template_name = 'example/api-client.html'

    def get(self, request, *args, **kwargs):
        from .urls import urlpatterns
        endpoints = []
        for u in urlpatterns:
            if 'api/' in u.regex.pattern:
                endpoints.append(ApiUrl(name=u.name, url=reverse(u.name,
                                                                 args=u.regex.groupindex.keys())))
        kwargs['endpoints'] = endpoints
        return super(ApiClientView, self).get(request, *args, **kwargs)


class ApiEndpoint(ProtectedResourceView):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, OAuth2!')
