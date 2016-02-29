# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""



from __future__ import absolute_import
from rest_framework.response import Response
from sentry.api.bases.stream import StreamEndpoint
from sentry.api.base import Endpoint
from sentry.models.user import User
from sentry.models.dashboard import LogDashboard
from django.core import serializers
from django.http import HttpResponse
from sentry.models.host_stream import Stream, Host
from sentry.conf.server import *
import requests
import datetime


class DashboardIndexEndpoint(Endpoint):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        """
        List an stream's dashboard
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string host id : the host id  for Host instance
        :auth: required
        """
        print request.user
        if User.objects.filter(id=request.user.id):
            dashboard_list = LogDashboard.objects.filter(user=request.user)
            resp_list = []
            for d in dashboard_list:
                obj = {}
                obj['name'] = d.name
                obj['desc'] = d.desc
                obj['layout'] = d.layout
                obj['widget_count'] = d.widget_count
                obj['create_timestamp'] = d.create_timestamp
                obj['last_timestamp'] = d.last_timestamp
                obj['id'] = d.id
                resp_list.append(obj)
            return Response(resp_list, status=200)

        Response([], status=400)

    def post(self, request, *args, **kwargs):
        if User.objects.filter(id=request.user.id):
            result = request.POST
            op = result.get('op', '')
            if op == 'create':
                if not LogDashboard.objects.filter(name=result['name']):
                    LogDashboard.objects.create(name=result['name'],
                                                desc=result['desc'],
                                                widget_count=result.get('wdiget_count', 0),
                                                create_timestamp=datetime.datetime.now(),
                                                last_timestamp=datetime.datetime.now(),
                                                layout=result['layout'],
                                                user_id=request.user.id)
                    return Response(result, status=200)
                else:
                    return Response({'ret':False,
                                     'msg': 'The dashboard of %s has existed!'%(result['name'])},
                                    status=400)
            elif op == 'update':
                dashboard = LogDashboard.objects.filter(id=result['id'])
                if dashboard:
                    dashboard.update(id=result['id'],
                                     name=result['name'],
                                     desc=result['desc'],
                                     layout=result['layout'],
                                     last_timestamp=datetime.datetime.now(),
                                     widget_count=result.get('widget_count', 0))
                    return Response({'msg': 'ok'}, status=200)
                else:
                    return Response({'ret': False,
                                     'msg': 'The dashboard of %s does not existed!' %(result['id'])},
                                    status=400)
            return Response(status=500)

