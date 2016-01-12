
from sentry.models.host_stream import (
    Host, HostType, Stream, StreamType, Tag, LogEvent
)
from sentry.models.organizationmember import OrganizationMember
from sentry.models.organization import Organization
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from sentry.api.base import Endpoint
from sentry.api.authentication import QuietBasicAuthentication
from sentry.utils import load_demo


class DemoExceptionView(Endpoint):
    """
      POST /demo_exception
    """
    # serializer_class = HostSerializer
    # queryset = Host.objects.all()


    permission_classes = ()

    def get(self, request):
        # self.queryset = Host.objects.filter(user=request.user)
        # return self.list(request, *args, **kwargs)
        pass

    def post(self, request):
        org_member = OrganizationMember.objects.get(user_id=request.user.id)
        org = Organization.objects.get(id=org_member.organization_id)
        load_demo.create_demo_sample(num_events=1, org_name=org.name, user_name=request.user.username)
        return Response({'msg': 'ok'})

