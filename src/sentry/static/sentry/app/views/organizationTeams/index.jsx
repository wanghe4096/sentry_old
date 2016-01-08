import React from 'react';
import Reflux from 'reflux';

import {t} from '../../locale';
import ApiMixin from '../../mixins/apiMixin';
import ConfigStore from '../../stores/configStore';
import OrganizationHomeContainer from '../../components/organizations/homeContainer';
import OrganizationState from '../../mixins/organizationState';
import TeamStore from '../../stores/teamStore';
import TooltipMixin from '../../mixins/tooltip';
import {sortArray} from '../../utils';
import {Link} from 'react-router';
import ExpandedTeamList from './expandedTeamList';
import AllTeamsList from './allTeamsList';
import OrganizationStatOverview from './organizationStatOverview';
import SDKInstallWizard from '../../components/sdkInstallWizard';

const OrganizationTeams = React.createClass({
  mixins: [
    ApiMixin,
    OrganizationState,
    Reflux.listenTo(TeamStore, 'onTeamListChange'),
    TooltipMixin({
      selector: '.tip'
    })
  ],

  getInitialState() {
    return {
      activeNav: 'your-teams',
      teamList: sortArray(TeamStore.getAll(), function(o) {
        return o.name;
      }),
      showWizard:false,
      projectStats: {}
    };
  },

  componentWillMount() {
    this.fetchStats();
  },

  // TODO(dcramer): handle updating project stats when items change
  fetchStats() {
    this.api.request(this.getOrganizationStatsEndpoint(), {
      query: {
        since: new Date().getTime() / 1000 - 3600 * 24,
        stat: 'received',
        group: 'project'
      },
      success: (data) => {
        this.setState({
          projectStats: data
        });
      }
    });
  },

  getOrganizationStatsEndpoint() {
    let params = this.props.params;
    return '/organizations/' + params.orgId + '/stats/';
  },

  onTeamListChange() {
    let newTeamList = TeamStore.getAll();

    this.setState({
      teamList: sortArray(newTeamList, function(o) {
        return o.name;
      })
    });

    this.fetchStats();
  },

  toggleTeams(nav) {
    this.setState({
      activeNav: nav
    });
  },

  showWizardHandler() {
    this.setState({
      showWizard: true
    });
  },

  render() {
    if (!this.context.organization)
      return null;

    let access = this.getAccess();
    let features = this.getFeatures();
    let org = this.getOrganization();
    let urlPrefix = ConfigStore.get('urlPrefix') + '/organizations/' + org.slug;

    let activeNav = this.state.activeNav;
    let allTeams = this.state.teamList;
    let activeTeams = this.state.teamList.filter((team) => team.isMember);

    return (
      <OrganizationHomeContainer>
        <div className="row">
          <div className="col-md-9">
            <div className="team-list">
              <div className="pull-right">
                <div className="btn-toolbar">
                  <a className="hide btn btn-sm btn-primary tip" onClick={this.showWizardHandler} title="在项目内介入数据">{t('SDK install wizard')} >></a>
                  { this.state.showWizard && (
                    <SDKInstallWizard
                      onHide={() => this.setState({showWizard:false})}
                      org={org.id}/>
                  ) }
                  <Link
                    className="btn btn-sm btn-default tip"
                    to={`/organizations/${org.slug}/stats/`}>{t('Stats')}</Link>
                </div>
              </div>
              <ul className="nav nav-tabs border-bottom">
                <li className={activeNav === 'your-teams' && 'active'}>
                  <a onClick={this.toggleTeams.bind(this, 'your-teams')}>{t('Your Teams')}</a>
                </li>
                <li className={activeNav === 'all-teams' && 'active'}>
                  <a onClick={this.toggleTeams.bind(this, 'all-teams')}>{t('All Teams')} <span className="badge badge-soft">{allTeams.length}</span></a>
                </li>
              </ul>
              {activeNav == 'your-teams' ?
                <ExpandedTeamList
                    organization={org} teamList={activeTeams}
                    projectStats={this.state.projectStats}
                    hasTeams={allTeams.length !== 0}
                    showAllTeams={this.toggleTeams.bind(this, 'all-teams')} />
              :
                <AllTeamsList
                  organization={org} teamList={allTeams}
                  openMembership={features.has('open-membership') || access.has('org:write')} />
              }
            </div>
          </div>
          <OrganizationStatOverview orgId={this.props.params.orgId} className="col-md-3 stats-column" />
        </div>
      </OrganizationHomeContainer>
    );
  }
});

export default OrganizationTeams;
