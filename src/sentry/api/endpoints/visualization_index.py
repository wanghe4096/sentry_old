
# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from __future__ import absolute_import
from sentry.api.base import Endpoint
from sentry.models.visualization import Visaulization
from rest_framework.response import Response
import datetime
import ast


class VisualizationIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        queryset = Visaulization.objects.filter(user=request.user)
        dashboard_list = []
        for q in queryset:
            o = {}
            o['id'] = q.id
            o['name'] = q.name
            o['created_at'] = q.created_at
            o['updated_at'] = q.updated_at
            o['layout'] = q.layout
            o['is_fav'] = q.is_fav
            o['desc'] = q.desc
            dashboard_list.append(o)
        return Response(dashboard_list)

    def post(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        visualization = Visaulization.objects.create(name=data['name'],
                                    created_at=datetime.datetime.now(),
                                    updated_at=datetime.datetime.now(),
                                    is_fav=data['is_fav'],
                                    layout=data['layout'],
                                    desc=data['desc'],
                                    user=request.user)
        if visualization:
            return Response(data, status=200)
        else:
            return Response(status=500)
