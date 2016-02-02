# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import

from sentry.testutils import APITestCase

import requests

URL = "http://192.168.1.69/api/0/register"


class HostIndexEndpoint(APITestCase):
    def test_simple(self):
        response = requests.post(URL, data = {'username': 'wangh@loginsight.cn', 'email': 'wangh@loginsight.cn', 'password': '123' })
        assert response.status_code == 200, response.content


class AgentHostIndexEndpoint(APITestCase):
    def test_simple(self):
        pass
