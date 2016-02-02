from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django.views.generic import FormView, TemplateView, View
from django.shortcuts import render_to_response
from oauth2_provider.compat import urlencode
from oauth2_provider.views.generic import ProtectedResourceView

from .forms import ConsumerForm, ConsumerExchangeForm, AccessTokenDataForm
import requests
import base64

import json
from collections import namedtuple

ApiUrl = namedtuple('ApiUrl', 'name, url')


class ConsumerExchangeView(FormView):
    """
    The exchange view shows a form to manually perform the auth token swap
    """
    form_class = ConsumerExchangeForm
    template_name = 'example/consumer-exchange.html'

    def get(self, request, *args, **kwargs):
        print 'data ===', request.GET
        try:
            self.initial = {
                'code': request.GET['code'],
                'state': request.GET['state'],
                'redirect_url': request.build_absolute_uri(reverse('oauth-consumer-exchange'))
            }
            # print 'initial ===', self.initial
            # token_url = "http://localhost:8000/o/token/"
            # code = request.GET['code']
            # response_type='token'
            # redirect_url = "http://localhost:8000/consumer/exchange/"
            # client_id = 'Lzi9whmRK@;h2v0Kew_lj.8ciQPeOE5BkT!h37iU'
            # client_secret = 'CFIMgSWdCxii5Bf?z459Yp=Y5oGAU73IVD9IoJVGaM!f02UxjqXiL7RZqLLanYb0!uDQZuwkr=tN2N1DAzaugGIDN:WBj:.zqJ9BOlzkpZFc=u3V5?6GoSRF4AS8h6Qt'
            # headers = {'Authorization': "Basic " + base64.b64encode(client_id + ":" + client_secret)}
            # print 'header ===', headers
            # r = requests.post(token_url, auth=('admin', 'admin'), data = { 'code': code, 'redirect_uri': redirect_url, 'grant_type': "authorization_code"}, headers=headers)
            # print 'fffffffff====', r.status_code, r.text
        except KeyError:
            kwargs['noparams'] = True

        form_class = self.get_form_class()
        form = self.get_form(form_class)
        return self.render_to_response(self.get_context_data(form=form, **kwargs))
        # resp = """
        #  <li> client_id : %s </li>
        #  <li> client_secret : %s </li>
        #  <li> redirect url: %s </li>
        #  <li> token url : %s </li>
        #  <li> header : %s </li>
        #  <hr>
        #  %s
        # """ %(client_id, client_secret, redirect_url, token_url, headers, r.text)
        # return HttpResponse(resp)


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

