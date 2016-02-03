import React from 'react';
import {Redirect, Route, IndexRoute, IndexRedirect} from 'react-router';

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
import OrganizationRateLimits from 'views/organizationRateLimits';
import OrganizationStats from 'views/organizationStats';
import OrganizationTeams from 'views/organizationTeams';
import ProjectDashboard from 'views/projectDashboard';
import ProjectDetails from 'views/projectDetails';
import ProjectInstall from 'views/projectInstall';
import ProjectInstallOverview from 'views/projectInstall/overview';
import ProjectInstallPlatform from 'views/projectInstall/platform';
import ProjectReleases from 'views/projectReleases';
import ProjectSettings from 'views/projectSettings';
import ReleaseAllEvents from 'views/releaseAllEvents';
import ReleaseArtifacts from 'views/releaseArtifacts';
import ReleaseDetails from 'views/releaseDetails';
import ReleaseNewEvents from 'views/releaseNewEvents';
import RouteNotFound from 'views/routeNotFound';
import SharedGroupDetails from 'views/sharedGroupDetails';
import StorageIndex from 'views/storageIndex';
import SearchIndex from 'views/searchIndex';
import StorageApp from 'views/storageApp';
import SearchApp from 'views/searchApp';
import LogPreview from 'views/logPreview';
import EventsIndex from 'views/eventsIndex';
import Stream from 'views/stream';
import ExtractApp from 'views/extract/extractApp';
import ExtractIndex from 'views/extract/extractIndex';
import ExtractorApp from 'views/extract/extractorApp'
import ExtractorEvents from 'views/extract/extractorEvents';
import HomeApp from 'views/homeApp';
import OrganizationStore from 'stores/organizationStore';
import StreamTypeIndex from 'views/streamTypeIndex';

function appendTrailingSlash(nextState, replaceState) {
  let lastChar = nextState.location.pathname.slice(-1);
  if (lastChar !== '/') {
    replaceState(nextState, nextState.location.pathname + '/');
  }
}

const defaultOrg = OrganizationStore.items[0];


let routes = (
  <Route path="/" component={App}>

    <IndexRedirect to={defaultOrg.slug}/>

    <Redirect from="/events" to={defaultOrg.slug+'/events'}/>
    <Redirect from="/storage" to={defaultOrg.slug+'/storage'}/>
    <Redirect from="/search" to={defaultOrg.slug+'/search'}/>
    <Redirect from="/home" to={defaultOrg.slug+'/home'} />
    <Redirect from="/streamtype" to={defaultOrg.slug+'/streamtype'} />

    <Redirect from="/share/group/:shareId/" to="/share/issue/:shareId/"/>
    <Route path="/share/issue/:shareId/" component={SharedGroupDetails}/>


    <Route path="/:orgId/" component={OrganizationDetails}>
      {
        //<IndexRoute component={OrganizationTeams} />
        //<Route path="/organizations/:orgId/issues/assigned/" component={MyIssuesAssignedToMe} />
        //<Route path="/organizations/:orgId/issues/bookmarks/" component={MyIssuesBookmarked} />
        //<Route path="/organizations/:orgId/issues/history/" component={MyIssuesViewed} />
        //<Route path="/organizations/:orgId/rate-limits/" component={OrganizationRateLimits} />
      }
      <Route path="/organizations/:orgId/stats/" component={OrganizationStats}/>

      <IndexRedirect to="home"/>

      <Route path="home" component={HomeApp} />

      <Route path="storage" component={StorageApp}>
        <IndexRoute component={StorageIndex}/>
        <Route path="preview/:logId" component={LogPreview}/>
      </Route>

      <Route path="extract" component={ExtractApp}>
        <IndexRoute component={ExtractIndex}/>
        <Route path=":streamId/:action" component={ExtractorApp}>
          <IndexRoute component={ExtractorEvents}/>
          {
            //<Route path="role" component={ExtractorRole}/>
          }
        </Route>
      </Route>

      <Route path="kb/streamtype" component={StreamTypeIndex} />

      <Route path="search" component={SearchApp}>
        <IndexRoute component={SearchIndex}/>
      </Route>

      <Route path="events" component={EventsIndex}>
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
            <Route path="install/" component={ProjectInstall}>
              <IndexRoute component={ProjectInstallOverview}/>
              <Route path=":platform/" component={ProjectInstallPlatform}/>
            </Route>

            <Route path="*" component={RouteNotFound}/>

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
          <Route path="*" component={RouteNotFound}/>
        </Route>

      </Route>
    </Route>

    <Route path="*" component={RouteNotFound} onEnter={appendTrailingSlash}/>
  </Route>
);

export default routes;