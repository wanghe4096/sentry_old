# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""
from sentry.models.log_search import Search
from rest_framework.response import Response
from sentry.api.bases.search import SearchEndpoint
from django.core.exceptions import ObjectDoesNotExist
import datetime
import re


class SearchIndexEndpoint(SearchEndpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            search_queryset = Search.objects.filter(user=request.user)
            search_list = []
            for e in search_queryset:
                obj = {}
                obj['id'] = e.id
                obj['name'] = e.name
                obj['create_timestamp'] = e.create_timestamp
                obj['last_timestamp'] = e.last_timestamp
                obj['query'] = e.query
                obj['time_range'] = e.time_range
                obj['config'] = e.config
                search_list.append(obj)
            return Response(search_list, status=200)
        return Response(status=400)

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
        # print('name = ', data['name'])
        Search.objects.create(name=data['name'],
                              query=data.get('query', ''),
                              config=data.get('config', ''),
                              user=request.user)
        return Response(status=200)

    def get_search_id(self, request):
        pattern = re.compile("/api/0/search/(?P<search_id>[^\/]+)/")
        search_id = self.parse_path(request, pattern, 'search_id')
        return int(search_id)

    def put(self, request, *args, **kwargs):
        data = request.DATA
        if len(data) == 0:
            return Response(status=400)

        pattern = re.compile("/api/0/search/(?P<search_id>[^\/]+)/")
        search_id = self.parse_path(request, pattern, 'search_id')
        try:
            search_obj = Search.objects.get(id=search_id)
        except ObjectDoesNotExist:
            search_obj = None

        search_obj.update(id=int(search_id),
                          name=data.get('name', ''),
                          last_timestamp=datetime.datetime.now(),
                          query=data.get('query', ''),
                          time_range=data['time_range'],
                          config=data.get('config', '')
                          )
        return Response(data)

    def delete(self, request, *args, **kwargs):
        search_id = self.get_search_id(request)
        search = Search.objects.get(id=search_id)
        search.delete()
        return Response(status=200)
