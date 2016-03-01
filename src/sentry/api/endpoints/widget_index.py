# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""
from sentry.api.base import Endpoint
from sentry.models.log_widget import LogWidget
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response


class WidgetIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
            widget_queryset = LogWidget.objects.filter(user=request.user)
            widget_list = []
            for e in widget_queryset:
                o = {}
                o['id'] = e.id
                o['title'] = e.title
                o['search_id'] = e.search_id
                o['x_axis'] = e.x_axis
                o['y_axis'] = e.y_axis
                o['chart_type'] = e.chart_type
                widget_list.append(o)
            return Response(widget_list, status=200)

    def post(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        LogWidget.objects.create(title=data['title'],
                                 search_id=data['search_id'],
                                 x_axis=data['x_axis'],
                                 y_axis=data['y_axis'],
                                 chart_type=data['chart_type'],
                                 user=request.user)
        return Response({'msg': 'ok'}, status=200)

