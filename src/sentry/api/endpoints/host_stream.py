# -*- coding: utf-8 -*-
from django.shortcuts import render

# Create your views here.
from sentry.api.serializers.models.host_stream import (
    HostSerializer, TagSerializer,
    HostTypeSerializer, StreamSerializer, StreamTypeSerializer, LogEventSerializer)

from sentry.models.host_stream import (
    Host, HostType, Stream, StreamType, Tag, LogEvent
)
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from sentry.api.base import Endpoint
from sentry.api.authentication import QuietBasicAuthentication


class HostView(Endpoint,
               mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):
    """
      GET /hosts
    """
    serializer_class = HostSerializer
    queryset = Host.objects.all()

    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()

    def get(self, request, *args, **kwargs):
        self.queryset = Host.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class HostTypeView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    """
    GET /host-type
    parm: none
    """
    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = HostTypeSerializer
    queryset = HostType.objects.all()

    def get(self, request, *args, **kwargs):
        self.queryset = HostType.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TagView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    """
    GET /tags
    param: none
    """
    authentication_classes = [QuietBasicAuthentication]
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
    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = StreamTypeSerializer
    queryset = StreamType.objects.all()

    def get(self, request, *args, **kwargs):
        self.queryset = StreamType.objects.filter(user=request.user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class StreamView(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    """
    GET /streams
    param:  host_name=hostA,hostB,hostC,hostD
    """
    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = StreamSerializer
    queryset = Stream.objects.all()

    def get(self, request, *args, **kwargs):
        host = request.GET.get('host_name', '')
        if len(host) == 0:
            self.queryset = Stream.objects.filter(user=request.user)
            return self.list(request, *args, **kwargs)

        host_list = []
        if len(str(host)) != 0:
            host_list = host.split(',')

        host_id_list = []
        for h in host_list:
            for e in Host.objects.filter(user=request.user):
                if h == e.host_name:
                    host_id_list.append(e.id)

        streams = []
        for host_id in host_id_list:
            s = Stream.objects.filter(host=host_id)
            obj = {'stream_name': '', 'stream_type':'', 'tag': '', 'size': 0}
            for e in s:
                obj['stream_name'] = e.stream_name
                obj['stream_type'] = StreamType.objects.filter(id = e.stream_type.id)[0].stream_type
                obj['host_name'] = Host.objects.filter(id=host_id)[0].host_name
                streams.append(obj)
        return Response(streams)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        pass



class LogEventView(mixins.ListModelMixin,
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
    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()
    serializer_class = LogEventSerializer
    queryset = LogEvent.objects.all()[:20]

    def get(self, request, *args, **kwargs):
        host_name = request.GET.get('host_name', '')
        event_offset_param = request.GET.get('event_offset', '0')
        event_count_param = request.GET.get('event_count', '20')
        event_offset = int(event_offset_param)
        event_count = int(event_count_param)
        if len(self.queryset) == 0:
            return Response([])
        self.queryset = LogEvent.objects.filter(user=request.user, host = Host.objects.filter(host_name=host_name)[0])[event_offset: event_offset + event_count]
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

