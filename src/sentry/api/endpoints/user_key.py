from __future__ import absolute_import
from rest_framework.response import Response
from sentry.api.authentication import QuietBasicAuthentication
from sentry.api.base import Endpoint
from sentry.models.user import User
from rest_framework import mixins
from rest_framework import generics
import hashlib
import datetime


def generate_user_key(user):
    data = user.username + user.email + user.password + str(datetime.datetime.now())
    hash_md5 = hashlib.md5(data)
    return hash_md5.hexdigest()


class UserkeyEndpoint(Endpoint,
                      mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      generics.GenericAPIView):
    """
     GET /api/0/user_key
    """
    authentication_classes = [QuietBasicAuthentication]
    permission_classes = ()

    # XXX: it's not quite clear if this should be documented or not at
    # this time.
    # doc_section = DocSection.ACCOUNTS
    queryset = User.objects.all()

    def get(self, request):
        user = User.objects.get(username=request.user.username)
        resp = {'user_key': user.userkey}
        return Response(resp)

    def post(self, request):
        user = User.objects.get(username=request.user.username)
        user_key = generate_user_key(user)
        if User.objects.filter(username=request.user.username).update(userkey=user_key):
            return Response({'msg': 'ok'})
        return Response({'msg': 'failed'})
