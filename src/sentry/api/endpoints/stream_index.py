

# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import
from rest_framework.response import Response
from sentry.api.bases.stream import StreamEndpoint
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
