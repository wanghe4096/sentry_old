# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import

from sentry.testutils import APITestCase


class HelloTest(APITestCase):
    def test_simple(self):
        print('hello unit test')
        self.login_as(user=self.user)

        url = '/api/0/dashboard/'
        response = self.client.get(url, format='json')
        print 'hello world', response.content
        assert response.status_code == 200, response.content
        assert len(response.content) == 2
