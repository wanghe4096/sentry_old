from __future__ import absolute_import
from rest_framework.response import Response
from sentry.api.authentication import QuietBasicAuthentication
from sentry.api.base import Endpoint
from sentry.models.user import User
from django.http.response import HttpResponse
<<<<<<< HEAD
from rest_framework import mixins
from rest_framework import generics
import simplejson as json
=======

>>>>>>> feature_api_host
import hashlib


def generate_user_key(username, email, password):
    data = username + email + password
    hash_md5 = hashlib.md5(data)
    return hash_md5.hexdigest()


class RegisterEndpoint(Endpoint):
    """
    Manage session authentication

    Intended to be used by the internal Sentry application to handle
    authentication methods from JS endpoints by relying on internal sessions
    and simple HTTP authentication.

    GET /register
    response userkey

    POST /register
    request:
            {
              'username':
              'password':
              'email':
              }
    response success/fail
    """

    authentication_classes = [QuietBasicAuthentication]

    permission_classes = ()

    # XXX: it's not quite clear if this should be documented or not at
    # this time.
    # doc_section = DocSection.ACCOUNTS
    queryset = User.objects.all()

    def get(self, request):
        print 'user=', request.user
        user = User.objects.filter(username=request.user)[0]
        return Response(user.userkey)

    def post(self, request):
<<<<<<< HEAD
        print request.POST.get('username')

=======
>>>>>>> feature_api_host
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        user_key = generate_user_key(username, email, password)
        user = User(username=username, email=email)
        user.userkey = user_key
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
