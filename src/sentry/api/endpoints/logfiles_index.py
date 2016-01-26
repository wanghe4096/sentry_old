# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from __future__ import absolute_import
from rest_framework.response import Response
from sentry.api.bases.logfile import LogFileEndpoint
from sentry.api.base import Endpoint
import requests

STORAGE_API_BASE_URL = "http://192.168.200.245:8080/api/v1"
# STORAGE_API_BASE_URL = "http://192.168.70.144:8080/api/v1"


class LogfileIndexEndpoint(LogFileEndpoint):

    def get(self, request):
        """
        List an logfile 's stream
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string host id : the host id  for Host instance
        :pparam string stream id: the stream_id for Stream of storage
        :auth: required
        """

        result = request.GET
        stream_id = result.get('stream_id', '0')
        host_id = result.get('host_id', '0')

        print 'stream_id = ', stream_id

        url = "%s/u/%s/nodes/%s/streams/%s/files" % (STORAGE_API_BASE_URL,
                                                    request.user.id,
                                                    host_id,
                                                    result['stream_id']
                                                    )
        print 'url = ', url
        r = requests.get(url)
        print r
        if r.status_code == 200:
            resp = r.json()
            print resp['files'][0]
            file_list = []
            for file in resp['files']:
                file_obj = {
                    'id': '',
                    'host_id': '',
                    'file_name':'',
                    'file_path': '',
                    'stream_id': '',
                    'size': '',
                    'host_id': '',
                    'create_timestamp':'',
                    'last_timestamp': '',
                    'access_timestamp': '',
                    'mod': '',
                    'gid': '',
                    'uid': '',
                    'file_tags': [],
                    'stream_key': '',
                    'stream_name': ''
                }

                file_obj['id'] = file[0]
                file_obj['host_id'] = file[1]
                file_obj['stream_key'] = file[3]
                file_obj['stream_name'] = file[4]
                file_obj['file_tags'] = file[5]['file_tags']
                tobj = file[5]['file_status']
                file_obj['file_name'] = tobj.get('filename')
                file_obj['file_path'] = tobj.get('file_dir')
                file_obj['uid'] = tobj.get('uid')
                file_obj['gid'] = tobj.get('gid')
                file_obj['mod'] = tobj['mod']
                file_obj['create_timestamp'] = tobj['create_time']
                file_obj['access_timestamp'] = tobj['access_time']
                file_obj['last_timestamp'] = tobj['modify_time']
                file_obj['create_timestamp'] = tobj['create_time']
                file_list.append(file_obj)
        return Response(file_list)
