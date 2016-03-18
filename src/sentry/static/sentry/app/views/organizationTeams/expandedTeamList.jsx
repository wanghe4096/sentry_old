import React from 'react';
import {Link} from 'react-router';
import LazyLoad from 'react-lazy-load';

import ApiMixin from '../../mixins/apiMixin';
import BarChart from '../../components/barChart';
import ProjectModal from '../../components/addProjectModal';
import ConfigStore from '../../stores/configStore';
import PropTypes from '../../proptypes';
import {sortArray} from '../../utils';
import {t, tct} from '../../locale';
import TeamModal from 'components/addTeamModal';

const ExpandedTeamList = React.createClass({
  propTypes: {
    organization: PropTypes.Organization.isRequired,
    teamList: React.PropTypes.arrayOf(PropTypes.Team).isRequired,
    projectStats: React.PropTypes.object
  },

  mixins: [
    ApiMixin
  ],

  getInitialState() {
    return {
      showTeamModal: false,
      showProjectModal: false
    };
  },

  addNewProject() {
    this.setState({
      showProjectModal: true
    });
  },

  closeProjectModal() {
    this.setState({
      showProjectModal: false
    });
  },

  leaveTeam(team) {
    // TODO(dcramer): handle loading indicator
    this.api.leaveTeam({
      orgId: this.props.organization.slug,
      teamId: team.slug
    });
  },

  urlPrefix() {
    let org = this.props.organization;
    return '/organizations/' + org.slug;
  },

  renderTeamNode(team, urlPrefix) {
    // TODO: make this cleaner
    if (team.projects.length) {
      return (
        <div className="box" key={team.slug}>
          <div className="box-header">
            <div className="pull-right actions hidden-xs">
              <a className="leave-team" onClick={this.leaveTeam.bind(this, team)}>
                {t('Leave Team')}
              </a>
              <a className="team-settings" href={urlPrefix + '/teams/' + team.slug + '/settings/'}>
                {t('Team Settings')}
              </a>
            </div>
            <h3>{team.name}</h3>
          </div>
          <div className="box-content">
            <table className="table project-list">
              <tbody>{sortArray(team.projects, function(o) {
                return o.name;
              }).map(this.renderProject)}</tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // todo: 离开团队需要confirm
      // todo: 每个 peoject 后面带引导页面的链接
      return (
        <div className="box" key={team.slug}>
          <div className="box-header">
            <div className="pull-right actions hidden-xs">
              <a className="leave-team" onClick={this.leaveTeam.bind(this, team)}>
                {t('Leave Team')}
              </a>
              <a className="team-settings" href={urlPrefix + '/teams/' + team.slug + '/settings/'}>
                {t('Team Settings')}
              </a>
            </div>
            <h3>{team.name}</h3>
          </div>
          <div className="box-content">
            <table className="table project-list">
              <tbody>
                <tr>
                  <td>
                    <p className="project-list-empty">
                      {t('There are no projects in this team. Get started by creating your first project.')}

                      <a onClick={this.addNewProject} > {t('Create Project')} ></a>
                      {this.state.showProjectModal && (
                          <ProjectModal
                              onHide={this.closeProjectModal}
                          />
                      )}

                      {/*
                      <a href={this.urlPrefix() + '/projects/new/?team=' + team.slug} > 创建项目 ></a>
                      */}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  },

  renderProject(project) {
    let org = this.props.organization;
    let projectStats = this.props.projectStats;
    let chartData = null;
    if (projectStats[project.id]) {
      chartData = projectStats[project.id].map((point) => {
        return {x: point[0], y: point[1]};
      });
    }

    return (
      <tr key={project.id}>
        <td>
          <h5>
            <Link to={`/${org.slug}/events/${project.slug}/`}>
              {project.name}
            </Link>
          </h5>
          <ul className="project-message hide">
            <li>
              <span>{t('time')}</span>
              <span>2015/10/12</span>
            </li>
            <li>
              <span>{t('host')}</span>
              <span>2</span>
            </li>
            <li>
              <span>{t('stream')}</span>
              <span>10</span>
            </li>
          </ul>
        </td>
        <td className="align-right project-chart">
          {chartData && <LazyLoad><BarChart points={chartData} className="sparkline" /></LazyLoad> }
        </td>
      </tr>
    );
  },

  showAllTeams(e) {
    e.preventDefault();
    this.props.showAllTeams();
  },

  renderEmpty() {
    if (this.props.hasTeams) {
      return (
        <p>
          {tct('You are not a member of any teams. [joinLink:Join an existing team] or [createLink:create a new one].', {
            joinLink: <a onClick={this.showAllTeams} />,
            createLink: <a href={this.urlPrefix() + '/teams/new/'} />
          })}
        </p>
      );

    }
    return (
      <p>
        {tct('You dont have any teams for this organization yet. Get started by [link:creating your first team].', {
          link: <a onClick={() => this.setState({showTeamModal: true}) } />
        })}
      </p>
    );
  },

  renderTeamNodes() {
    let urlPrefix = this.urlPrefix();
    return this.props.teamList.map((team) => {
      return this.renderTeamNode(team, urlPrefix);
    });
  },
  closeTeamModal() {
    this.setState({
      showTeamModal: false
    })
  },
  render() {
    let hasTeams = this.props.teamList.length > 0;

    return (
      <div>
        {
          this.state.showTeamModal && (
            <TeamModal
              onHide={this.closeTeamModal}
            />
          )
        }
        {hasTeams ? this.renderTeamNodes() : this.renderEmpty() }
      </div>
    );
  }
});

export default ExpandedTeamList;
