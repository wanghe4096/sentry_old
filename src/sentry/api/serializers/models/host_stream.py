from django.contrib.auth.models import User, Group
from rest_framework import serializers
from sentry.models.host_stream import Host, Stream, StreamType, HostType, Tag, LogEvent


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ('id', 'host_name', 'host_key', 'system', 'distver',  'host_type', 'user')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag_name', 'user', )


class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = ('id', 'stream_name',  'stream_type', 'host', 'user', 'tag')


class HostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostType
        fields = ('id', 'host_type', 'user' )


class StreamTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamType
        fields = ('id', 'stream_type', 'user',)


# class EventSerializer(serializers.Serializer):
#     payload = serializers.CharField(max_length=64*1024)
#     offset = serializers.IntegerField()
#
#     def create(self, validated_data):
#         return Event(**validated_data)


class LogEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEvent
        fields = ('id', 'payload', 'offset', 'stream', 'host', 'user',)


class HostStreamSerializer(serializers.Serializer):
    host_types = HostTypeSerializer(required=False)
    host = HostSerializer(required=False)
    streams = StreamSerializer(required=False)
    tags = TagSerializer(required=False)





