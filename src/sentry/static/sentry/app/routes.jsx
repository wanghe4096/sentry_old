import React from 'react';
import {Redirect, Route, IndexRoute, IndexRedirect} from 'react-router';
import BlockView from 'views/blockView';
import Admin from 'views/admin';
import AdminOrganizations from 'views/adminOrganizations';
import AdminOverview from 'views/adminOverview';
import AdminSettings from 'views/adminSettings';
import App from 'views/app';
import GroupActivity from 'views/groupActivity';
import GroupDetails from 'views/groupDetails';
import GroupEventDetails from 'views/groupEventDetails';
import GroupEvents from 'views/groupEvents';
import GroupTags from 'views/groupTags';
import GroupTagValues from 'views/groupTagValues';
import GroupUserReports from 'views/groupUserReports';
import MyIssuesAssignedToMe from 'views/myIssues/assignedToMe';
import MyIssuesBookmarked from 'views/myIssues/bookmarked';
import MyIssuesViewed from 'views/myIssues/viewed';
import OrganizationDetails from 'views/organizationDetails';
import OrganizationTeams from 'views/organizationTeams';
import ProjectDashboard from 'views/projectDashboard';
import ProjectDetails from 'views/projectDetails';
import ProjectInstall from 'views/projectInstall';
import ProjectInstallOverview from 'views/projectInstall/overview';
import ProjectInstallPlatform from 'views/projectInstall/platform';
import ProjectReleases from 'views/projectReleases';
// projects settings
import ProjectSettings from 'views/projectSettingApp';
import PSIndex from 'views/projectSetting/index';
import PSNotifications from 'views/projectSetting/notifications';
import PSRules from 'views/projectSetting/rules';
import PSTags from 'views/projectSetting/tags';
import PSIssueTracking from 'views/projectSetting/issueTracking';
import PSReleaseTracking from 'views/projectSetting/releaseTracking';
import PSKeys from 'views/projectSetting/keys';
import PSPlugins from 'views/projectSetting/plugins';
import PSQuotas from 'views/projectSetting/quotas';

import ReleaseAllEvents from 'views/releaseAllEvents';
import ReleaseArtifacts from 'views/releaseArtifacts';
import ReleaseDetails from 'views/releaseDetails';
import ReleaseNewEvents from 'views/releaseNewEvents';
import RouteNotFound from 'views/routeNotFound';
import SharedGroupDetails from 'views/sharedGroupDetails';
import StorageIndex from 'views/storageIndex';
import StorageApp from 'views/storageApp';
import LogPreview from 'views/logPreview';
import SearchApp from 'views/searchApp';
import SearchIndex from 'views/searchIndex';
import SearchVisual from 'views/searchVisual';
import SearchVisualIndex from 'views/searchVisualIndex';
import SearchVisualDesigner from 'views/searchVisualDesigner';
import DashboardList from 'views/dashboardList';
import DashboardDetail from 'views/dashboardDetail';
import EventsIndex from 'views/eventsIndex';
import Stream from 'views/stream';
import ExtractApp from 'views/extract/extractApp';
import ExtractIndex from 'views/extract/extractIndex';
import ExtractorApp from 'views/extract/extractorApp'
import ExtractorEvents from 'views/extract/extractorEvents';
import HomeApp from 'views/homeApp';
import OrganizationStore from 'stores/organizationStore';
import StreamTypeIndex from 'views/streamTypeIndex';
import FileImportApp from 'views/fileImportApp';
import LiveLogApp from 'views/liveLogApp';
import PowerPackApp from 'views/powerPackApp';
import AlertsApp from 'views/alertsApp';
import SetHomeApp from 'views/setHomeApp';
import AddOrganization from 'views/addOrganization';
import SassIndex from 'views/sassIndex';
// Organization Manage
import OrgManageLayout from 'views/orgManageLayout';
import OrganizationStats from 'views/organizationManage/stats';
import OrganizationSetting from 'views/organizationManage/settings';
import OrganizationRateLimits from 'views/organizationManage/rateLimits';
import OrganizationMembers from 'views/organizationManage/members';
import OrganizationApiKeys from 'views/organizationManage/apiKeys';
import OrganizationAuditLog from 'views/organizationManage/auditLog';
import OrganizationAuth from 'views/organizationManage/auth';

function appendTrailingSlash(nextState, replaceState) {
  let lastChar = nextState.location.pathname.slice(-1);
  if (lastChar !== '/') {
    replaceState(nextState, nextState.location.pathname + '/');
  }
}

// const defaultOrg = OrganizationStore.items[0];

let routes = (
  <Route path="/" component={App}>

    {
      // <IndexRedirect to={defaultOrg.slug}/>
      // <Redirect from="/events" to={defaultOrg.slug + '/events/'} />
      // <Redirect from="/storage" to={defaultOrg.slug + '/storage/'} />
      // <Redirect from="/search" to={defaultOrg.slug+'/search/'} />
      // <Redirect from="/dashboard" to={defaultOrg.slug+'/dashboard/'} />
      // <Redirect from="/home" to={defaultOrg.slug + '/home/'} />
      // <Redirect from="/streamtype" to={defaultOrg.slug + '/streamtype/'} />
    }

    <IndexRoute component={SassIndex} />
    <Redirect from="/share/group/:shareId/" to="/share/issue/:shareId/"/>
    <Route path="/share/issue/:shareId/" component={SharedGroupDetails}/>

    <Route path="/organizations/new/" component={AddOrganization}/>

    <Route path="/:orgId/" component={OrganizationDetails} >
      {
        //<IndexRoute component={OrganizationTeams} />
        //<Route path="/organizations/:orgId/issues/assigned/" component={MyIssuesAssignedToMe} />
        //<Route path="/organizations/:orgId/issues/bookmarks/" component={MyIssuesBookmarked} />
        //<Route path="/organizations/:orgId/issues/history/" component={MyIssuesViewed} />
        //<Route path="/organizations/:orgId/rate-limits/" component={OrganizationRateLimits} />
      }

      <IndexRedirect to="home/"/>

      <Route path="home/" component={HomeApp}/>

      <Route path="manage/" component={OrgManageLayout} >
        <IndexRoute component={OrganizationStats} />
        <Route path="stats/" component={OrganizationStats} />
        <Route path="members/" component={OrganizationMembers} />
        <Route path="auth/" component={OrganizationAuth} />
        <Route path="audit-log/" component={OrganizationAuditLog} />
        <Route path="api-keys/" component={OrganizationApiKeys} />
        <Route path="rate-limits/" component={OrganizationRateLimits} />
        <Route path="settings/" component={OrganizationSetting} />
      </Route>

      <Route path="homeset/" component={SetHomeApp} />

      <Route path="fileimport/" component={FileImportApp}/>

      <Route path="storage/" component={StorageApp}>
        <IndexRoute component={StorageIndex}/>
        <Route path="preview/:logId" component={LogPreview}/>
      </Route>

      <Route path="extract/" component={ExtractApp}>
        <IndexRoute component={ExtractIndex}/>
        <Route path=":streamId/:action" component={ExtractorApp}>
          <IndexRoute component={ExtractorEvents}/>
        </Route>
      </Route>

      <Route path="kb/streamtype" component={StreamTypeIndex}/>

      <Route path="search/" component={SearchApp}>
        <IndexRoute component={SearchIndex} />
        <Route path="vs/" component={SearchVisual} >
          <IndexRoute component={SearchVisualIndex} />
          <Route path=":widgetId/" component={SearchVisualDesigner} />
        </Route>
      </Route>

      <Route path="dashboard/" component={BlockView}>
        <IndexRoute component={DashboardList} />
        <Route path=":dashboardId/" component={DashboardDetail} />
      </Route>

      <Route path="live/" component={LiveLogApp} />

      <Route path="powerpack/" component={PowerPackApp} />

      <Route path="alert/" component={AlertsApp} />

      <Route path="events/" component={EventsIndex}>

        <IndexRoute component={OrganizationTeams}/>
        <Route path=":projectId/" component={ProjectDetails}>
          <IndexRoute component={Stream}/>

          <Route path="dashboard/" component={ProjectDashboard}/>
          <Route path="releases/" component={ProjectReleases}/>
          <Route name="releaseDetails" path="releases/:version/" component={ReleaseDetails}>
            <IndexRoute component={ReleaseNewEvents}/>
            <Route path="all-events/" component={ReleaseAllEvents}/>
            <Route path="artifacts/" component={ReleaseArtifacts}/>
          </Route>

          <Route path="settings/" component={ProjectSettings}>
            <IndexRoute component={PSIndex} />
            <Route path="notifications/" component={PSNotifications} />
            <Route path="rules/" component={PSRules} />
            <Route path="tags/" component={PSTags} />
            <Route path="issue-tracking/" component={PSIssueTracking} />
            <Route path="release-tracking/" component={PSReleaseTracking} />
            <Route path="keys/" component={PSKeys} />
            <Route path="plugins/" component={PSPlugins} />
            <Route path="quotas/" component={PSQuotas} />

            <Route path="install/" component={ProjectInstall}>
              <IndexRoute component={ProjectInstallOverview}/>
              <Route path=":platform/" component={ProjectInstallPlatform}/>
            </Route>

            <Route path="*" component={RouteNotFound} onEnter={appendTrailingSlash}/>

          </Route>

          <Redirect from="group/:groupId/" to="issues/:groupId/"/>

          <Route path="issues/:groupId/" component={GroupDetails} ignoreScrollBehavior>
            <IndexRoute component={GroupEventDetails}/>
            <Route path="activity/" component={GroupActivity}/>
            <Route path="events/:eventId/" component={GroupEventDetails}/>
            <Route path="events/" component={GroupEvents}/>
            <Route path="tags/" component={GroupTags}/>
            <Route path="tags/:tagKey/" component={GroupTagValues}/>
            <Route path="reports/" component={GroupUserReports}/>
          </Route>
          <Route path="*" component={RouteNotFound} onEnter={appendTrailingSlash}/>
        </Route>

      </Route>
      <Route path="*" component={RouteNotFound} onEnter={appendTrailingSlash}/>
    </Route>

    <Route path="*" component={RouteNotFound} onEnter={appendTrailingSlash}/>
  </Route>
);

export default routes;
