# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from sentry.api.base import Endpoint
from sentry.models.log_indexes import Indexes
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
import datetime


class IndexesDetailsEndpoint(Endpoint):
    permission_classes = []

    def convert_args(self, request, index_id, *args, **kwargs):
        kwargs['index_id'] = index_id
        return (args, kwargs)

    def get(self, request, index_id, *args, **kwargs):
        try:
            index = Indexes.objects.get(id=index_id, user=request.user)
        except ObjectDoesNotExist:
            return Response(status=400, data={'msg': 'object does not exist!'})
        if index:
            return Response({'name': index.name,
                             'desc': index.desc,
                             'type': index.type,
                             'dsn': index.dsn,
                             'created_at': index.created_at,
                             'updated_at': index.updated_at}, status=200)
        else:
            return Response(status=400)

    def put(self, request, index_id, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)
        if index_id:
            indexes = Indexes.objects.filter(id=index_id, user=request.user)
            if not indexes:
                return Response(data, status=200)
            indexes.update(name=data['name'],
                           desc=data['desc'],
                           updated_at=datetime.datetime.now(),
                           type=data['type'],
                           dsn=data['dsn'])
            return Response(status=200)
        return Response(status=400)

    def delete(self, request, index_id, *args, **kwargs):
        index = Indexes.objects.get(id=index_id, user=request.user)
        if index:
            index.delete()
            return Response(status=200)
        return Response(status=400)
