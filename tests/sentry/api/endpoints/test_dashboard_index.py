# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import

from django.core.urlresolvers import reverse
from exam import fixture

from sentry.testutils import APITestCase


class DashboardListTest(APITestCase):
    @fixture
    def path(self):
        return reverse('sentry-api-0-log-dashboard')

    def test_membership(self):
        print('----------------')
        self.login_as(user=self.user)
        response = self.client.get('{}'.format(self.path))
        assert response.status_code == 200
        assert len(response.data) == 1
        print response.body
