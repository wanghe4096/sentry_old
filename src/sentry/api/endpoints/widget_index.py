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
import re


class WidgetIndexEndpoint(Endpoint):
    permission_classes = []

    def get_widget_id(self, request):
        pattern = re.compile("/api/0/widget/(?P<widget_id>[^\/]+)/")
        widget_id = self.parse_path(request, pattern, 'widget_id')
        return int(widget_id)

    def convert_args(self, request, widget_id,  *args, **kwargs):
        kwargs['widget_id'] = widget_id
        return (args, kwargs)

    def get(self, request, widget_id, *args, **kwargs):
        widget_id = widget_id
        if widget_id:
            try:
                widget = LogWidget.objects.get(id=widget_id, user=request.user)
            except ObjectDoesNotExist:
                return Response(status=400)
        return Response({'id': widget.id,
                         'title': widget.title,
                         'search_id': widget.search_id,
                         'x_axis': widget.x_axis,
                         'y_axis': widget.y_axis,
                         'chart_type': widget.chart_type})

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

    def put(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        widget_id = self.get(request)
        if widget_id:
            try:
                widget = LogWidget.objects.get(id=widget_id, user=request.user)
            except ObjectDoesNotExist:
                return Response(status=400)
            widget.update(title=data['title'],
                          search_id=data['search_id'],
                          x_axis=data['x_axis'],
                          y_axis=data['y_axis'],
                          chart_type=data['chart_type'])
            return Response(data, status=200)

    def delete(self, request, *args, **kwargs):
        widget_id = self.get_widget_id(request)
        widget = LogWidget.objects.get(id=widget_id, user=request.user)
        if widget:
            widget.delete()
            return Response(status=200)
        return Response(status=400)
