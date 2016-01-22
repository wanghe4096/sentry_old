# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""

from __future__ import absolute_import

from rest_framework import serializers, status
from rest_framework.response import Response

from sentry.api.base import DocSection
from sentry.api.bases.host import HostEndpoint
from sentry.api.serializers import serialize
from sentry.api.serializers.models.host import HostSerializer
from sentry.models.organizationmember import OrganizationMember
from sentry.models.organization import Organization
from sentry.models import (
    AuditLogEntryEvent, Host
)
from sentry.utils.apidocs import scenario, attach_scenarios
import  datetime
import hashlib

@scenario('CreateNewHost')
def create_new_host_scenario(runner):
    runner.request(
        method='POST',
        path='/hosts/' % runner.org.slug,
        data={
            'host_nme': 'demo_host',
            'system': 'os',
            'distver': 'v3.1'
        }
    )


@scenario('ListHosts')
def list_hosts_scenario(runner):
    runner.request(
        method='GET',
       path='/hosts/'
    )

def generate_host_key(result):
    m = hashlib.md5()
    m.update(str(datetime.datetime.now())+str(result))
    host_key = m.hexdigest()
    return host_key


class HostIndexEndpoint(HostEndpoint):
    doc_section = DocSection.HOSTS

    @attach_scenarios([list_hosts_scenario])
    def get(self, request):
        """
        List an Organization's hosts
        ````````````````````````````

        Return a list of hosts bound to a organization.

        :pparam string organization_slug: the slug of the organization for
                                          which the teams should be listed.
        :auth: required
        """
        # TODO(dcramer): this should be system-wide default for organization
        # based endpoints

        host_list = list(Host.objects.filter(
            user=request.user
        ).order_by('host_name', 'system'))

        return Response(serialize(
            host_list, request.user, HostSerializer()))

    @attach_scenarios([create_new_host_scenario])
    def post(self, request):
        """
        Create a new host
        ``````````````````

        Create a new host bound to an organization.  Only the name of the
        team is needed to create it, the slug can be auto generated.

        :pparam string organization_slug: the slug of the organization the
                                          team should be created for.
        :param string name: the name of the organization.
        :param string slug: the optional slug for this organization.  If
                            not provided it will be auto generated from the
                            name.
        :auth: required
        """
        # serializer = HostSerializer(data=request.DATA)
        # if serializer.is_valid():
        #     result = serializer.object

        result = request.DATA
        org_mem = OrganizationMember.objects.get(user=request.user)
        org = Organization.objects.get(id=org_mem.organization_id)

        host = Host.objects.create(
            host_name=result['host_name'],
            host_key=generate_host_key(result),
            host_type=result['host_type'],
            system=result['system'],
            distver=result['distver'],
            last_time=result['last_time'],
            create_time=result['create_time'],
            user_id=request.user.id,
            organization=org,
        )
        self.create_audit_entry(
            request=request,
            organization=org,
            target_object=host.id,
            event=AuditLogEntryEvent.HOST_ADD,
            data=host.get_audit_log_data(),
        )
        return Response({'msg': 'ok'}, status=201)