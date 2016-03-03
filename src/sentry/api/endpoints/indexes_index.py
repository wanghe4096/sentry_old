# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from __future__ import absolute_import
from sentry.api.base import Endpoint
from sentry.models.log_indexes import Indexes
from rest_framework.response import Response
import datetime


class IndexesIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        queryset = Indexes.objects.filter(user=request.user)
        indexes_list = []
        for q in queryset:
            o = {}
            o['id'] = q.id
            o['name'] = q.name
            o['type'] = q.type
            o['dsn'] = q.dsn
            o['desc'] = q.desc
            o['created_at'] = q.created_at
            o['updated_at'] = q.updated_at
            indexes_list.append(o)
        return Response(indexes_list)

    def post(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        indexes = Indexes.objects.create(name=data['name'],
                                         created_at=datetime.datetime.now(),
                                         updated_at=datetime.datetime.now(),
                                         type=data.get('type', None),
                                         dsn=data.get('dsn', None),
                                         desc=data.get('desc', None),
                                         user=request.user)
        if indexes:
            return Response(data, status=200)
        else:
            return Response(status=500)
