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


class WidgetDetailsEndpoint(Endpoint):
    permission_classes = []

    def convert_args(self, request, widget_id, *args, **kwargs):
        kwargs['widget_id'] = widget_id
        return (args, kwargs)

    def get(self, request, widget_id, *args,  **kwargs):
        widget = LogWidget.objects.get(id=widget_id, user=request.user)
        if widget:
            return Response({'title': widget.title,
                             'search_id': widget.search_id,
                             'x_axis': widget.x_axis,
                             'y_axis': widget.y_axis,
                             'chart_type': widget.chart_type}, status=200)
        else:
            return Response(status=400)

    def put(self, request, widget_id, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        if widget_id:
            try:
                widget = LogWidget.objects.filter(id=widget_id, user=request.user)
            except ObjectDoesNotExist:
                return Response(status=400)
            widget.update(title=data['title'],
                          search=int(data['search_id']),
                          x_axis=data['x_axis'],
                          y_axis=data['y_axis'],
                          chart_type=data['chart_type'])
            return Response(data, status=200)
        return Response(status=400)

    def delete(self, request, widget_id, *args, **kwargs):
        widget = LogWidget.objects.get(id=widget_id, user=request.user)
        if widget:
            widget.delete()
            return Response(status=200)
        return Response(status=400)
