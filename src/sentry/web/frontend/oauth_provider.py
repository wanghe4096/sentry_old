# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""
from __future__ import absolute_import

from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse

from sentry import features
from sentry.web.frontend.base import BaseView
from django.views.generic import View
import requests
import datetime
import base64

class ProviderView(View):
    def get(self, request):
        print 'GET DATA =====', request.GET
        state = request.GET.get('state', '')
        code = request.GET.get('code', '')

        print 'state ===', state
        print 'code ===', code
        token_url = "http://localhost:8000/o/token/"
        client_id = 'hck;KDbmt2QIQ;fSbHB73T;bz.tyWV?wkOGEMm;4'
        client_secret = 'lMtl9aSlRMOlBk3NI!ARcTV9@MaumpK?o8mZb7tP@cb-ic29=y7dwUAoBvXZooPATxQN8f_@97v-3t2yu9ubs:=GZZlr1oqLcJH6ZH5a1yOAc34awfb8aiC=q-iPb;=G'
        redirect_uri = 'http://localhost:8000/consumer/exchange/'
        authorize_link = 'http://localhost:8000/o/authorize/?state=random_state_string&response_type=code&client_id=' + client_id
        code = base64.b64encode(str(datetime.datetime.now()))

        r = requests.get(authorize_link)
        # print r.text

        headers = {'Authorization': "Basic " + base64.b64encode(client_id + ":" + client_secret)}
        r = requests.post(token_url,  data={'grant_type': 'authorization_code', 'code': code, 'redirect_uri': redirect_uri}, headers=headers )
        print r
        print r.text
        r = requests.get("http://localhost:8000/consumer/exchange?random_state_string&code=" + code)

        print r.json()
        return HttpResponse("<h1> hello world </h1>")
        pass



    def post(self, request):
        print 'POST DATA ===', request.POST
        pass
