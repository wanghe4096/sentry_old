# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from __future__ import unicode_literals
from sentry.models.user import User
from sentry.models.organization import Organization
from django.core import serializers

from django.db import models


class LogDashboard(models.Model):
    name = models.CharField(max_length=128)
    desc = models.CharField(max_length=128, null=True)
    create_timestamp = models.DateTimeField(null=True)
    last_timestamp = models.DateTimeField(null=True)
    is_fav = models.BooleanField(null=True)
    layout = models.CharField(max_length=512*1024)
    time_range = models.CharField(max_length=256, null=True)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_dashboard'

    def __unicode__(self):
        return self.name
