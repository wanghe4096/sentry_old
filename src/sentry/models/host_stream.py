from __future__ import unicode_literals
from sentry.models.user import User
from django.db import models

# Create your models here.


class HostType(models.Model):
    host_type = models.CharField(max_length=128)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_host_type'

    def __unicode__(self):
        return self.host_type


class Host(models.Model):
    host_name = models.CharField(max_length=128)
    # host ident
    host_key = models.CharField(max_length=128, null=True)
    # system type
    system = models.CharField(max_length=128, null=True)
    #system version
    distver = models.CharField(max_length=128, null=True)
    host_type = models.ForeignKey(HostType)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_host'

    def __unicode__(self):
        return self.host_name


class Tag(models.Model):
    tag_name = models.CharField(max_length=128)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_tag'

    def __unicode__(self):
        return self.tag_name


class StreamType(models.Model):
    stream_type = models.CharField(max_length=128)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_stream_type'

    def __unicode__(self):
        return self.stream_type


class Stream(models.Model):
    stream_name = models.CharField(max_length=128)
    stream_type = models.ForeignKey(StreamType)
    size = models.IntegerField(null=True)
    modify_timestamp = models.DateTimeField(null=True)
    create_timestamp = models.DateTimeField(null=True)
    tag = models.ForeignKey(Tag, null=True)
    host = models.ForeignKey(Host)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_stream'

    def __unicode__(self):
        return self.stream_name


class LogEvent(models.Model):
    payload = models.CharField(max_length=64*1024)
    offset = models.IntegerField()
    stream = models.ForeignKey(Stream)
    host = models.ForeignKey(Host)
    user = models.ForeignKey(User)
    tag = models.ForeignKey(Tag, null=True)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_log_event'

    def __unicode__(self):
        return self.payload

