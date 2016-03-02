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
#
#
# class OrganizationsCreateTest(APITestCase):
#     @fixture
#     def path(self):
#         return reverse('sentry-api-0-organizations')
#
#     def test_missing_params(self):
#         self.login_as(user=self.user)
#         resp = self.client.post(self.path)
#         assert resp.status_code == 400
#
#     def test_valid_params(self):
#         self.login_as(user=self.user)
#
#         resp = self.client.post(self.path, data={
#             'name': 'hello world',
#             'slug': 'foobar',
#         })
#         assert resp.status_code == 201, resp.content
#         org = Organization.objects.get(id=resp.data['id'])
#         assert org.name == 'hello world'
#         assert org.slug == 'foobar'
#
#     def test_without_slug(self):
#         self.login_as(user=self.user)
#
#         resp = self.client.post(self.path, data={
#             'name': 'hello world',
#         })
#         assert resp.status_code == 201, resp.content
#         org = Organization.objects.get(id=resp.data['id'])
#         assert org.slug == 'hello-world'
