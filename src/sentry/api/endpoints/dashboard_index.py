# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import
from sentry.api.base import Endpoint
from sentry.models.LogInsightDashboard import LogInsightDashboard
from rest_framework.response import Response
import datetime
import ast


class DashboardIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        queryset = LogInsightDashboard.objects.filter(user=request.user)
        dashboard_list = []
        for q in queryset:
            o = {}
            o['id'] = q.id
            o['name'] = q.name
            o['layout'] = ast.literal_eval(q.layout)
            o['created_at'] = q.created_at
            o['updated_at'] = q.updated_at
            o['is_fav'] = q.is_fav
            dashboard_list.append(o)
        return Response(dashboard_list)

    def post(self, request, *args, **kwargs):
        data = request.DATA
        print(request.META)
        if len(data) == 0:
            return Response(status=400)
        dashboard = LogInsightDashboard.objects.create(name=data['name'],
                                                       created_at=datetime.datetime.now(),
                                                       updated_at=datetime.datetime.now(),
                                                       desc=data['desc'],
                                                       layout=data['layout'],
                                                       is_fav=data['is_fav'],
                                                       user_id=request.user.id)
        if dashboard:
            return Response(data, status=200)
        else:
            return Response(status=500)

if __name__ == "__main__":
    from django.test.client import Client
    c = Client()
    c.login(username="admin@loginsight.cn", password="123")
    response = c.get("/api/0/dashboard/")
    print response.body





