# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from sentry.api.base import Endpoint
from rest_framework.response import Response


class UploadIndexEndpoint(Endpoint):

    def get(self, request):
        pass

    def post(self, request):
        files = request.FILES
        return Response([files])