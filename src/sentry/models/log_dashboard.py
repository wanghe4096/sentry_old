# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""
from __future__ import unicode_literals
from sentry.models.user import User
from django.db import models
import datetime


class LogDashboard(models.Model):
    title = models.CharField(max_length=512)
    desc = models.CharField(max_length=512, null=True)
    created_at = models.DateTimeField(default=datetime.datetime.now(), null=True)
    updated_time = models.DateTimeField(default=datetime.datetime.now(), null=True)
    is_fav = models.BooleanField(null=True)
    layout = models.CharField(max_length=512 * 1024)
    user = models.ForeignKey(User)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_log_dashboard'

    def __unicode__(self):
        return self.name
