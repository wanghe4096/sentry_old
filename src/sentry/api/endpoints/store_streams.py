# -*- coding: utf-8 -*-
__author__ = 'wanghe'
__company__ = 'LogInsight'
__email__ = 'wangh@loginsight.cn'

# Create your views here.
from sentry.api.serializers.models.host_stream import (
    TagSerializer,HostTypeSerializer, StreamSerializer, StreamTypeSerializer, LogEventSerializer, LogFileSerializer)

from sentry.models.host_stream import (
    Host, HostType, Stream, StreamType, Tag, LogEvent, LogFile
)
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from sentry.api.base import Endpoint
import os
import datetime
import random



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
        # self.queryset = HostType.objects.filter(user=request.user)
        result = [{'id': 1, 'host_type': 'Web服务器'},
                  {'id': 2, 'host_type': '数据库服务器'},
                  {'id': 3, 'host_type': '代理服务器'},
                  {'id': 4, 'host_type': 'VPN'}
                  ]
        return Response(result)
        # return self.list(request, *args, **kwargs)

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


class TagView(Endpoint,
              mixins.ListModelMixin,
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


class StreamTypeView(Endpoint,
                     mixins.ListModelMixin,
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
        # self.queryset = StreamType.objects.filter(user=request.user)
        result = [{'id':1,
                   'stream_name':'nginx.access',
                   'size': 12353532,
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 1,
                   },
                  {'id':2,
                   'stream_name':'nginx.error',
                   'size': 12353532,
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 1,
                   },
                  {'id':3,
                   'stream_name':'system',
                   'size': 12353532,
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 2,
                   },
                  {'id':4,
                   'stream_name':'auth.log',
                   'size': 12353532,
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 2,
                   },
                  {'id':5,
                   'stream_name':'apache.access',
                   'size':  random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 3,
                   },
                  {'id':6,
                   'stream_name':'apache.error',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id':3
                   },
                  {'id':7,
                   'stream_name':'tomcat.access',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 3,
                   },
                  {'id':8,
                   'stream_name':'tomcat.error',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id':3
                   }
                  ]
        return Response(result)

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
         result = [{'id':1,
                   'stream_name':'nginx.access',
                   'size': random.randint(54*1024, 100*1024),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 1,
                   },
                  {'id':2,
                   'stream_name':'nginx.error',
                   'size': random.randint(54*1024, 100*1024),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 1,
                   },
                  {'id':3,
                   'stream_name':'apache.accesss',
                   'size': random.randint(54*1024, 100*1024),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 2,
                   },
                  {'id':4,
                   'stream_name':'apache.error',
                   'size': random.randint(54*1024, 100*1024),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 2,
                   },
                  {'id':5,
                   'stream_name':'system',
                   'size':  random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 3,
                   },
                  {'id':6,
                   'stream_name':'kern',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id':3
                   },
                  {'id':7,
                   'stream_name':'message',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id': 3,
                   },
                  {'id':8,
                   'stream_name':'auth',
                   'size': random.randint(64*1024, 256*1024*3),
                   'create_timestamp': str(datetime.datetime.now()),
                   'last_timestamp': str(datetime.datetime.now()),
                   'host_id':3
                   }
                  ]
         return Response(result)
        # host_id = request.GET.get('host_id', '')
        # host_obj = Host.objects.get(id=host_id)
        # if not host_obj:
        #     return Response({'msg': 'Invalid Host id'})
        # self.queryset = Stream.objects.filter(host=host_obj)
        # return self.list(request, *args, **kwargs)

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


class LogFilesView(Endpoint,
                   mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):

    permission_classes = ()
    serializer_class = LogFileSerializer
    queryset = LogFile.objects.all()

    def get(self, request, *args, **kwargs):
        # stream_name_str = request.GET.get('stream_name', '')
        # stream_id_str = request.GET.get('stream_id', '')
        # stream_obj = Stream.objects.get(id=stream_id_str)
        # if not stream_obj:
        #     return Response({'msg': 'Invalid host id'})
        # self.queryset = LogFile.objects.filter(stream=stream_obj)
        # return self.list(request,*args, **kwargs)
        result = [{'id': '1',
                   'file_name': 'access.log',
                   'file_path': '/var/log/nginx',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '2',
                   'file_name': 'access.log.0',
                   'file_path': '/var/log/nginx',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '3',
                   'file_name': 'access.log.1',
                   'file_path': '/var/log/nginx',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '4',
                   'file_name': 'access.log.2',
                   'file_path': '/var/log/nginx',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '6',
                   'file_name': 'access.log.3',
                   'file_path': '/var/log/nginx',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id': '1'},
                  {'id': '7',
                   'file_name': 'error.log',
                   'file_path': '/var/log/nginx',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id': '1'},
                  {'id': '8',
                   'file_name': 'error.log.1',
                   'file_path': '/var/log/nginx',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id': '1'},
                  {'id': '9',
                   'file_name': 'error.log.2',
                   'file_path': '/var/log/nginx',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id': '2'},
                  {'id': '10',
                   'file_name': 'error.log.3',
                   'file_path': '/var/log/nginx',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id': '1'},

                  {'id': '11',
                   'file_name': 'error.log',
                   'file_path': '/var/log/apache',
                   'stream_id': 3,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '12',
                   'file_name': 'error.log.0',
                   'file_path': '/var/log/apache',
                   'stream_id': 3,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '13',
                   'file_name': 'error.log.1',
                   'file_path': '/var/log/apache',
                   'stream_id': 3,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '12',
                   'file_name': 'access.log',
                   'file_path': '/var/log/apache',
                   'stream_id': 4,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '13',
                   'file_name': 'access.log.1',
                   'file_path': '/var/log/apache',
                   'stream_id': 4,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '14',
                   'file_name': 'access.log.2',
                   'file_path': '/var/log/apache',
                   'stream_id': 4,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '15',
                   'file_name': 'system.log' ,
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '16',
                   'file_name': 'system.log.0',
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '17',
                   'file_name': 'system.log.1',
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '18',
                   'file_name': 'system.log.2',
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '19',
                   'file_name': 'system.log.3',
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '20',
                   'file_name': 'system.log.4',
                   'file_path': '/var/log/',
                   'stream_id': 2,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},

                  {'id': '21',
                   'file_name': 'message.log',
                   'file_path': '/var/log/',
                   'stream_id': 7,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '22',
                   'file_name': 'message.log.1',
                   'file_path': '/var/log',
                   'stream_id': 7,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '23',
                   'file_name': 'message.log.2',
                   'file_path': '/var/log',
                   'stream_id': 7,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'24'},
                  {'id': '25',
                   'file_name': 'kern.log',
                   'file_path': '/var/log',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'2'},
                  {'id': '26',
                   'file_name': 'kern.log.1',
                   'file_path': '/var/log',
                   'stream_id': 1,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '27',
                   'file_name': 'kern.log.1',
                   'file_path': '/var/log',
                   'stream_id': 6,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '28',
                   'file_name': 'kern.log.1',
                   'file_path': '/var/log',
                   'stream_id': 6,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '29',
                   'file_name': 'kern.log.2',
                   'file_path': '/var/log',
                   'stream_id': 6,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '30',
                   'file_name': 'kern.log.3',
                   'file_path': '/var/log',
                   'stream_id': 6,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'},
                  {'id': '31',
                   'file_name': 'kern.log.4',
                   'file_path': '/var/log',
                   'stream_id': 6,
                   'size': random.randint(64*1024, 234*4321),
                   'host_id':'1'}
                  ]

        stream_id = request.GET.get("stream_id", '1')
        print 'ffffff', stream_id
        resp = []
        for e in result:
            obj = {'id':'', 'file_name': '', 'file_path': '', 'stream_id': 0, 'size':0, 'host_id':''}
            print e['stream_id']
            if stream_id == e['stream_id']:
                print e
                obj['id'] = e['id']
                obj['file_name'] = e['file_name']
                obj['file_path'] = e['file_path']
                obj['stream_id'] = e['stream_id']
                obj['size'] = e['size']
                obj['host_id'] = e['host_id']
                resp.append(obj)

        return Response(result)

    def post(self, request, *args, **kwargs):
        file_name_req = request.POST.get('file_name', '')
        file_path_req = request.POST.get('file_path', '')
        host_id_req = request.POST.get('host_id', '')
        stream_id_req = request.POST.get('stream_id', '')
        create_timestamp_req = request.POST.get('create_timestamp', str(datetime.datetime.now()))
        modify_timestamp_req = request.POST.get('modify_timestamp', str(datetime.datetime.now()))
        file_size_req = request.POST.get('file_size', '')
        crc32_value_req = request.POST.get('crc32_value', '')
        host_obj = Host.objects.get(id=host_id_req)
        if not host_obj:
            return Response({'msg': 'Invalid host id'})
        stream_obj = Stream.objects.get(id=stream_id_req)
        if not stream_obj:
            return Response({'msg': 'Invalid stream '})
        if not LogFile.objects.filter(crc32_value=crc32_value_req):
            log_file_obj = LogFile(file_name=file_name_req,
                                   file_path=file_path_req,
                                   host=host_obj,
                                   stream = stream_obj,
                                   # stream=stream_obj
                                   # create_timestamp=create_timestamp_req,
                                   # modify_timestamp=modify_timestamp_req,
                                   size= random.randint(64*1024, 128*1024),
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
        event_obj = {'payload': '', 'offset': 0, 'file_id': 0, 'create_timestamp': '', 'last_timestamp':'', 'size':''}
        for l in events:
            event_obj['payload'] = l
            event_obj['offset'] = event_offset
            event_obj['create_timestamp'] = str(datetime.datetime.now())
            event_obj['last_timestamp'] = str(datetime.datetime.now())
            event_obj['size'] = str(len(l))
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