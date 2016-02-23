

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
from sentry.models.host_stream import Stream, Host
from sentry.conf.server import *
import requests
import datetime

# STORAGE_API_BASE_URL = "http://192.168.200.245:8080/api/v1"
# STORAGE_API_BASE_URL = "http://192.168.70.144:8080/api/v1"


class StreamIndexEndpoint(StreamEndpoint):

    def get(self, request):
        """
        List an stream's hosts
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string host id : the host id  for Host instance
        :auth: required
        """
        result = request.GET
        print 'result = ', result['host_id']
        url = "%s/u/%s/nodes/%s/streams" % (STORAGE_API_BASE_URL, request.user.id,  result['host_id'])
        r = requests.get(url)
        print r
        if r.status_code == 200:
            resp = r.json()
            stream_list = []
            for stream in resp['stream_list']:
                stream_obj = {'id':'', 'stream_name': '', 'create_timestamp': '', 'last_timestamp': '', 'size': ''}
                stream_id = stream[0]
                stream_name = stream[1]
                obj = stream[3]
                stream_obj['id'] = stream_id
                stream_obj['stream_name'] = stream_name
                stream_obj['create_timestamp'] = obj.get('create_time', 'null')
                stream_obj['last_timestamp'] = obj.get('modify_time', 'null')
                stream_obj['size'] = obj.get('size', '0')
                stream_list.append(stream_obj)
        return Response(stream_list)


class LogAgentStreamEndpoint(Endpoint):
    permission_classes = []

    def get(self, request):
        pass

    def post(self, request):
        user_id = self.validate_accesstoken(request.META['HTTP_AUTHORIZATION'], request)
        if user_id == self.INVALID_ACCESS_TOKEN:
            return Response({'action': 'add stream', 'msg': 'Invalid access token'})

        data = request.DATA
        user = User.objects.get(id=user_id)
        if not user:
            return Response({'action': 'add stream', 'msg': 'Invalid user'}, status=400)
        host = Host.objects.get(host_key=data['host_key'])
        if not host:
            return Response({'action': 'add stream', 'msg': 'Invalid host key'}, status=400)
        if not Stream.objects.filter(stream_key=data['stream_key']):
            stream = Stream.objects.create(
                stream_name=data['match_name'],
                alias_name=data['alias_name'],
                host= host,
                user=user,
                stream_key=data['stream_key'],
                create_timestamp=datetime.datetime.now(),
                modify_timestamp=datetime.datetime.now(),
            )
            return Response({'action': 'add stream', 'msg': 'ok'}, status=200)
        else:
            return Response({'action': 'add stream', 'msg': 'stream has exists!'}, status=200)

        # stream = Stream(data)
        # stream.save()
        # return Response(status=200, data=stream)

