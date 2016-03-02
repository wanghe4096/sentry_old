# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from sentry.api.base import Endpoint
from sentry.models.LogInsightDashboard import LogInsightDashboard
from rest_framework.response import Response
from sentry.api.serializers import serialize
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers, status
import ast
import datetime



class DashboardDetailsEndpoint(Endpoint):
    permission_classes = []

    def convert_args(self, request, dashboard_id, *args, **kwargs):
        kwargs['dashboard_id'] = dashboard_id
        return (args, kwargs)

    def get(self, request, dashboard_id, *args,  **kwargs):
        try:
            dashboard = LogInsightDashboard.objects.get(id=dashboard_id, user=request.user)
        except ObjectDoesNotExist:
            return Response(status=400, data={'msg': 'object does not exist!'})
        if dashboard:
            return Response({'name': dashboard.name,
                             'desc': dashboard.desc,
                             'is_fav': dashboard.is_fav,
                             'created_at': dashboard.created_at,
                             'updated_at': dashboard.updated_at,
                             'layout': ast.literal_eval(dashboard.layout)}, status=200)
        else:
            return Response(status=400)

    def put(self, request, dashboard_id,  *args, **kwargs):
        data = request.DATA
        print(request.DATA)
        if len(data) == 0:
            return Response(status=400)
        if dashboard_id:
            dashboard = LogInsightDashboard.objects.filter(id=dashboard_id, user=request.user)
            if not dashboard:
                return Response(data, status=200)
            dashboard.update(name=data['name'],
                             desc=data['desc'],
                             updated_at=datetime.datetime.now(),
                             is_fav=data['is_fav'],
                             layout=data['layout'])
            return Response(status=200)
        return Response(status=400)

    def delete(self, request, dashboard_id, *args, **kwargs):
        dashboard = LogInsightDashboard.objects.get(id=dashboard_id, user=request.user)
        if dashboard:
            dashboard.delete()
            return Response(status=200)
        return Response(status=400)
