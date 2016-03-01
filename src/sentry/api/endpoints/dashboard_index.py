# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import
from sentry.api.base import Endpoint
from sentry.models.log_dashboard import LogDashboard
from rest_framework.response import Response
import datetime
import json


class DashboardIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        queryset = LogDashboard.objects.filter(user=request.user)
        dashboard_list = []
        for q in queryset:
            o = {}
            o['id'] = q.id
            o['title'] = q.title
            o['layout'] = json.loads(q.layout)
            o['created_at'] = q.created_at
            o['updated_at'] = q.updated_at
            o['is_fav'] = q.is_fav
            dashboard_list.append(o)
        return Response(dashboard_list)

    def post(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        dashboard = LogDashboard.objects.create(title=data['title'],
                                    created_at=datetime.datetime.now(),
                                    updated_at=datetime.datetime.now(),
                                    layout=data['layout'],
                                    is_fav=data['is_fav'],
                                    user=request.user)
        if dashboard:
            return Response(data, status=200)
        else:
            return Response(status=500)

    def put(self, request, *args, **kwargs):
        pass

    def delte(self, request, *args, **kwargs):
        pass
