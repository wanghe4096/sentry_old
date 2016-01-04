from __future__ import absolute_import

from django.contrib.auth import login, logout
from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from rest_framework.request import Request

from sentry.api.authentication import QuietBasicAuthentication
from sentry.api.base import Endpoint
from sentry.api.serializers import serialize
from sentry.api.serializers.models.user import UserSerializer
from sentry.models.user import User
from django.http.response import HttpResponse
import simplejson as json


class RegisterEndpoint(Endpoint):
    """
    Manage session authentication

    Intended to be used by the internal Sentry application to handle
    authentication methods from JS endpoints by relying on internal sessions
    and simple HTTP authentication.
    """

    authentication_classes = [QuietBasicAuthentication]

    permission_classes = ()

    # XXX: it's not quite clear if this should be documented or not at
    # this time.
    # doc_section = DocSection.ACCOUNTS

    def get(self, request):
        return HttpResponse(request.user)
        print request.DATA

    def post(self, request):
        print request.DATA
        print request.POST.get('username')

        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        user = User(username=username, email=email)
        user.set_password(password)
        user.is_active = True
        user.is_managed = True
        user.is_staff = True
        if not User.objects.filter(username=username):
            if not User.objects.filter(email=email):
                user.save()
                resp = {'info':'success'}
                return HttpResponse(str(resp))
        resp = {'error': 'user exists'}
        return HttpResponse(str(resp))
