# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from sentry.api.base import Endpoint
from sentry.models.log_indexes import Indexes
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
import datetime


class IndexesDetailsEndpoint(Endpoint):
    permission_classes = []

    def convert_args(self, request, index_id, *args, **kwargs):
        kwargs['index_id'] = index_id
        return (args, kwargs)

    def get(self, request, index_id, *args, **kwargs):
       pass

    def put(self, request, index_id, *args, **kwargs):
        pass

    def delete(self, request, index_id, *args, **kwargs):
        pass
