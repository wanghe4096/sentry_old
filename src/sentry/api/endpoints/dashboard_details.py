# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from sentry.api.base import Endpoint
from sentry.models.log_dashboard import Dashboard
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
import ast
import datetime


class DashboardDetailsEndpoint(Endpoint):
    permission_classes = []

    def convert_args(self, request, dashboard_id, *args, **kwargs):
        kwargs['dashboard_id'] = dashboard_id
        return (args, kwargs)

    def get(self, request, search_id, *args,  **kwargs):
        dashboard = Dashboard.objects.get(id=search_id, user=request.user)
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
        if len(data) == 0:
            return Response(status=400)
        dashboard_id = self.get(request)
        if dashboard_id:
            try:
                dashboard = Dashboard.objects.get(id=dashboard_id, user=request.user)
            except ObjectDoesNotExist:
                return Response(status=400)
            dashboard.update(id=dashboard_id,
                             name=data['name'],
                             desc=data['desc'],
                             is_fav=data['is_fav'],
                             layout=data['layout'])
            return Response(data, status=200)

    def delete(self, request, dashboard_id, *args, **kwargs):
        dashboard = Dashboard.objects.get(id=dashboard_id, user=request.user)
        if dashboard:
            dashboard.delete()
            return Response(status=200)
        return Response(status=400)
