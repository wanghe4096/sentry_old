from __future__ import unicode_literals
from sentry.models.user import User
from django.db import models

# Create your models here.


class HostType(models.Model):
    host_type = models.CharField(max_length=128, null=True)
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
    stream_type = models.ForeignKey(StreamType, null=True)
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


class LogFile(models.Model):
    file_name = models.CharField(max_length=128)
    file_path = models.CharField(max_length=256, null=True)
    stream_type = models.CharField(max_length=128, null=True)
    host = models.ForeignKey(Host, null=True)
    tag = models.ForeignKey(Tag, null=True)
    stream = models.ForeignKey(Stream, null=True)
    create_timestamp = models.DateTimeField(null=True)
    modify_timestamp = models.DateTimeField(null=True)
    owner = models.IntegerField(null=True)
    group = models.IntegerField(null=True)
    mod = models.IntegerField(null=True)
    size = models.IntegerField(null=True)
    crc32_value = models.IntegerField(null=True)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_log_file'

    def __unicode__(self):
        return self.file_name


class LogEvent(models.Model):
    payload = models.CharField(max_length=64*1024)
    offset = models.IntegerField(null=True)
    # stream = models.ForeignKey(Stream, null=True)
    logfile = models.ForeignKey(LogFile, null=True)
    host = models.ForeignKey(Host)
    user = models.ForeignKey(User)
    tag = models.ForeignKey(Tag, null=True)
    event_no = models.IntegerField(null=True)
    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_log_event'

    def __unicode__(self):
        return self.payload

