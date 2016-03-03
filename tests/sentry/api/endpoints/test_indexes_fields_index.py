# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import

from sentry.testutils import APITestCase


class IndexesIndexTest(APITestCase):
    def test_simple(self):
        self.login_as(user=self.user)
        print('test indexes ======================================')
        url = "/api/0/indexes/"
        response = self.client.post(url, data={'name': 'nginx'}, content_type="application/json")
        assert response.status_code == 200, response.content

        url = "/api/0/indexes/1/"
        self.login_as(user=self.user)
        response = self.client.get(url)
        assert response.status_code == 200, response.content
        print('test indexes ======================================')
        url = "/api/0/indexes/1/fields/"