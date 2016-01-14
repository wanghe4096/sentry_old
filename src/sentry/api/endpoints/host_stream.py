# -*- coding: utf-8 -*-
from django.shortcuts import render

# Create your views here.
from sentry.api.serializers.models.host_stream import (
    HostSerializer, TagSerializer,
    HostTypeSerializer, StreamSerializer, StreamTypeSerializer, LogEventSerializer, LogFileSerializer)

from sentry.models.host_stream import (
    Host, HostType, Stream, StreamType, Tag, LogEvent, LogFile
)
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from sentry.api.base import Endpoint
from sentry.api.authentication import QuietBasicAuthentication
import os
import requests

class HostView(Endpoint,
               mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):
    """
      GET /hosts
    """
    serializer_class = HostSerializer
    queryset = Host.objects.all()

    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()

    def get(self, request, *args, **kwargs):
        if request.user.username == 'AnonymousUser':
            return Response({'msg': 'Invalid user'})

        self.queryset = Host.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        host_type_s = request.POST.get('host_type', '')
        host_name = request.POST.get('host_name', '')
        host_key = request.POST.get('host_key', '')
        system = request.POST.get('system', '')
        distver = request.POST.get('distver', '')
        host_type_obj = HostType.objects.get(host_type=host_type_s, user=request.user)
        if not host_type_obj:
            return Response({'msg': 'Invalid Host type'})

        host = Host(host_name = host_name, host_type=host_type_obj, host_key=host_key, system = system, distver = distver, user=request.user)
        if Host.objects.filter(host_key=host_key):
            return Response({'msg': 'Host has exists!'})
        host.save()
        return Response({'msg': 'Success to add host'})


class HostTypeView(Endpoint,
                mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    """
    GET /host-type
    parm: none
    """
    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = HostTypeSerializer
    queryset = HostType.objects.all()

    def get(self, request, *args, **kwargs):
        self.queryset = HostType.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request):
        host_type_s = request.POST.get('host_type')
        if host_type_s is None:
            return Response({'msg': 'Invalid host_type'})
        if len(host_type_s) == 0:
            return Response({'msg': 'Invalid host_type'})
        if not HostType.objects.filter(host_type=host_type_s, user=request.user):
            ht = HostType(host_type=host_type_s, user=request.user)
            ht.save()
            return Response({'msg': 'success to add host type'})
        return Response({'msg': 'Invalid host_type'})

        # return self.create(request, *args, **kwargs)


class TagView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    """
    GET /tags
    param: none
    """
    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def get(self, request, *args, **kwargs):
        self.queryset = Tag.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class StreamTypeView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    """
    GET /stream-type
    PARAM: none
    """
    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = StreamTypeSerializer
    queryset = StreamType.objects.all()

    def get(self, request, *args, **kwargs):
        self.queryset = StreamType.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        stream_type_req = request.POST.get('stream_type', '')
        stream_type_obj = StreamType.objects.filter(stream_type=stream_type_req, user=request.user)
        if not stream_type_obj:
            obj = StreamType(stream_type=stream_type_req, user=request.user)
            obj.save()
            return Response({'msg': 'Success to add stream type'})
        return Response({'msg': ' Stream Type has exists'})

        # return self.create(request, *args, **kwargs)


class StreamView(Endpoint,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 generics.GenericAPIView):
    """
    GET /streams
    param:  host_name=hostA,hostB,hostC,hostD
    """
    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = StreamSerializer
    queryset = Stream.objects.all()

    def get(self, request, *args, **kwargs):
        host_id = request.GET.get('host_id', '')
        print 'host_id=========', host_id
        host_obj = Host.objects.get(id=host_id)
        if not host_obj:
            return Response({'msg': 'Invalid Host id'})
        self.queryset = Stream.objects.filter(host=host_obj)
        return self.list(request, *args, **kwargs)

        # Storage server client
        # host_id = request.GET.get('host_id', '')
        # print 'host_id=', host_id
        # host = Host.objects.get(id=host_id)
        # resp = None
        # if not host:
        #     resp = requests.get("http:192.168.200.228:5000?hostid="+host.id)
        #     return Response(resp.text)
        # return Response({"msg": "Not found host"})

        # if len(host) == 0:
        #     self.queryset = Stream.objects.filter(user=request.user)
        #     return self.list(request, *args, **kwargs)
        #
        # host_list = []
        # if len(str(host)) != 0:
        #     host_list = host.split(',')
        #
        # host_id_list = []
        # for h in host_list:
        #     for e in Host.objects.filter(user=request.user):
        #         if h == e.host_name:
        #             host_id_list.append(e.id)
        #
        # streams = []
        # for host_id in host_id_list:
        #     s = Stream.objects.filter(host=host_id)
        #     obj = {'stream_name': '', 'stream_type':'', 'tag': '', 'size': 0}
        #     for e in s:
        #         obj['stream_name'] = e.stream_name
        #         obj['stream_type'] = StreamType.objects.filter(id = e.stream_type.id)[0].stream_type
        #         obj['host_name'] = Host.objects.fapi/0/streams?host_id=1ilter(id=host_id)[0].host_name
        #         streams.append(obj)

    def post(self, request, *args, **kwargs):
        stream_name_req = request.POST.get('stream_name', '')
        stream_type_req = request.POST.get('stream_type', '')
        host_id_req = request.POST.get('host_id', '')
        if len(stream_name_req) == 0 or len(stream_type_req ) == 0 or len(host_id_req) == 0:
            return Response({'msg': 'Invalid request parameters'})
        host_obj = Host.objects.get(id=host_id_req, user=request.user)
        if not host_obj:
            return Response({'msg': 'Invalid host id'})
        stream_type_obj = StreamType.objects.get(stream_type=stream_type_req, user=request.user)
        if not stream_type_obj:
            return Response({'msg': 'Invalid stream type'})
        if not Stream.objects.filter(stream_name=stream_name_req):
            stream_obj = Stream(stream_name=stream_name_req, host=host_obj, stream_type=stream_type_obj,  user=request.user)
            stream_obj.save()
            return Response({'msg': 'success to add stream'})

        return Response({'msg': 'Stream has existed'})


import datetime

class LogFilesView(Endpoint,
                mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):

    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = LogFileSerializer
    queryset = LogFile.objects.all()

    def get(self, request, *args, **kwargs):
        host_id = request.GET.get('host_id', '')
        host_obj = Host.objects.get(id=host_id)
        if not host_obj:
            return Response({'msg': 'Invalid host id'})
        self.queryset = LogFile.objects.filter(host=host_obj)
        return self.list(request,*args, **kwargs)

    def post(self, request, *args, **kwargs):
        file_name_req = request.POST.get('file_name', '')
        file_path_req = request.POST.get('file_path', '')
        host_id_req = request.POST.get('host_id', '')
        stream_name_req = request.POST.get('stream_name', '')
        create_timestamp_req = request.POST.get('create_timestamp', str(datetime.datetime.now()))
        modify_timestamp_req = request.POST.get('modify_timestamp', str(datetime.datetime.now()))
        file_size_req = request.POST.get('file_size', '')
        crc32_value_req = request.POST.get('crc32_value', '')
        host_obj = Host.objects.get(id=host_id_req, user=request.user)
        if not host_obj:
            return Response({'msg': 'Invalid host id'})
        stream_obj = Stream.objects.get(stream_name=stream_name_req, user=request.user)
        if not stream_obj:
            return Response({'msg': 'Invalid stream '})
        if not LogFile.objects.filter(crc32_value=crc32_value_req):
            log_file_obj = LogFile(file_name=file_name_req,
                                   file_path=file_path_req,
                                   host=host_obj,
                                   # stream=stream_obj
                                   # create_timestamp=create_timestamp_req,
                                   # modify_timestamp=modify_timestamp_req,
                                   # size=file_size_req,
                                   crc32_value=crc32_value_req
                                   )
            log_file_obj.save()
            return Response({'msg': 'Success to add log file.'})
        return Response({'msg': 'Invalid request parameters'})



class LogEventView(Endpoint,
                mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    """
    GET /events
    param:
        default: return line 20 raw log event
        host_name=[hostA,hostB,hostC,...]
        event_offset  = 0
        event_count = 0
    """
    # authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = LogEventSerializer
    queryset = LogEvent.objects.all()[:20]

    raw_log_path = os.path.join(os.path.expanduser("~"), 'apache.log')

    def get(self, request, *args, **kwargs):
        file_id = request.GET.get('file_id', '')
        event_offset_param = request.GET.get('event_offset', '0')
        event_count_param = request.GET.get('event_count', '20')
        event_offset = int(event_offset_param)
        event_count = int(event_count_param)

        lines = []
        with open(self.raw_log_path, "r") as fd:
            lines = fd.readlines()
        events = lines[event_offset: event_offset + event_count]
        result = []
        event_obj = {'payload': '', 'offset': 0, 'file_id': 0}
        for l in events:
            event_obj['payload'] = l
            event_obj['offset'] = event_offset
            event_offset = event_offset + 1
            result.append(event_obj)
        return Response(result)

        # if len(self.queryset) == 0:
        #     return Response([])
        # file_obj = LogFile.objects.get(id=file_id)
        # if not file_obj:
        #     return {'msg': 'Invalid file id'}
        #
        # self.queryset = LogEvent.objects.filter(logfile=file_obj)[event_offset: event_offset+event_count]
        # event_obj = {'payload': '', 'offset': 0, 'file_id': 0}
        # result = []
        # i = event_offset
        # for e in self.queryset:
        #
        #     event_obj['payload'] = e.payload
        #     event_obj['offset'] = i
        #     result.append(event_obj)
        #     i = i + 1

        # return Response(result)
        # return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        pass

        # 'payload, 'offset', 'host', 'user', 'LogFile'
        # payload_req = request.POST.get('payload', '')
        # offset_req = request.POST.get('offset', '')
        # host_req = request.POST.get('host_id', '')
        # file_id_req = request.POST.get('file_id','')
        # host_obj = Host.objects.get(id=host_req)
        # if not host_obj:
        #     return Response({'msg': 'Invalid host id'})
        #
        # file_obj = LogFile.objects.get(id=file_id_req)
        # if not file_obj:
        #     return Response({'msg': 'Invalid file id'})
        #
        # event_obj = LogEvent(payload=payload_req, offset=offset_req, host=host_obj, logfile=file_obj, user=request.user)
        # event_obj.save()
        # return Response({'msg': 'success add event '})
        # return Response({'msg': 'add event ok'})