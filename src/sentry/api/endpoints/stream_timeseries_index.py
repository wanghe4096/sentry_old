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
from django.conf import settings


class StreamTimeSeriesIndexEndpoint(Endpoint):

    def get(self, request):
        """
        List an stream's timeseries count
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string stream_key : the host id  for Host instance
        :pparam string step : default 3600s
        :pparam string count: default 20
        :pparam string offset: default 0
        :auth: required
        : resp.body = {
            "start_time": //起始时间
            "timeseries": [count, count, count]
        }
        """
        result = request.GET
        # streams = Stream.objects.filter(host_id=result['host_id'])
        stream_list = []
        uri = "/stream/timeseries/"
        r = requests.post(settings.STORAGE_API_BASE_URL + uri,  data=result)
        return Response(r.json())


