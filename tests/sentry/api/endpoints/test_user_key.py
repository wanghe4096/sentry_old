# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from __future__ import absolute_import

from sentry.testutils import APITestCase
from sentry.models import User
import requests

URL = "http://192.168.1.69/api/0/user_key"
username = 'wangh@loginsight.cn'
password = '123'


class UserKey(APITestCase):
    def test_simple(self):
        user = User.objects.create(username=username)
        user.set_password('123')
        user.save()
        response = requests.get(URL,  auth=(username, password))
        assert response.status_code == 200, response.content




