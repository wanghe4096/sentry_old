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


class StreamTimeSeriesIndexEndpoint(Endpoint):

    def get(self, request):
        """
        List an stream's hosts
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string host id : the host id  for Host instance
        :auth: required
        """
        result = request.GET
        # streams = Stream.objects.filter(host_id=result['host_id'])
        stream_list = []
        # for stream in streams:
        #     stream_obj = {'id':'', 'stream_name': '', 'create_timestamp': '', 'last_timestamp': '', 'size': ''}
        #     stream_id = stream.id
        #     stream_name = stream.stream_name
        #     stream_obj['id'] = stream_id
        #     stream_obj['stream_name'] = stream_name
        #     stream_obj['create_timestamp'] = stream.create_timestamp
        #     stream_obj['last_timestamp'] = stream.modify_timestamp
        #     stream_obj['size'] = stream.size
        #     stream_list.append(stream_obj)
        return Response(stream_list)


