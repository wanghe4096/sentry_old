# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""
from sentry.models.log_search import Search
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from sentry.api.base import Endpoint
import ast


class SearchIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
            try:
                search_queryset = Search.objects.filter(user_id=request.user.id)
            except ObjectDoesNotExist:
                return Response(status=400)
            search_list = []
            for e in search_queryset:
                obj = {}
                obj['id'] = e.id
                obj['name'] = e.name
                obj['create_timestamp'] = e.create_timestamp
                obj['last_timestamp'] = e.last_timestamp
                obj['query'] = e.query
                if e.time_range is None:
                    obj['time_range'] = None
                else:
                    obj['time_range'] = ast.literal_eval(e.time_range)
                obj['config'] = e.config
                search_list.append(obj)
            return Response(search_list, status=200)

    def post(self, request):
        data = request.DATA
        print 'data = ', data
        if len(data) == 0:
            return Response(status=400)
        search_list = Search.objects.filter(name=data.get('name', ''))
        if search_list:
            return Response({'msg': 'existed!'}, status=404)
        if len(data.get('name', '')) == 0:
            return Response(status=404)
        Search.objects.create(name=data['name'],
                              query=data.get('query', ''),
                              config=data.get('config', ''),
                              time_range=data['time_range'],
                              user=request.user)
        return Response(status=200)
