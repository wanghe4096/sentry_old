import React from 'react';

import ApiMixin from '../mixins/apiMixin';
import {Link, IndexLink} from 'react-router';
import ConfigStore from 'stores/configStore';
import ListLink from 'components/listLink';
import LoadingError from 'components/loadingError';
import LoadingIndicator from 'components/loadingIndicator';
import {t} from '../locale';

const ProjectSettings = React.createClass({
  propTypes: {
    setProjectNavSection: React.PropTypes.func
  },

  contextTypes: {
    location: React.PropTypes.object
  },

  mixins: [
    ApiMixin
  ],

  getInitialState() {
    return {
      loading: true,
      error: false,
      project: null
    };
  },

  componentWillMount() {
    this.props.setProjectNavSection('settings');
    this.fetchData();
  },

  componentWillReceiveProps(nextProps) {
    let params = this.props.params;
    if (nextProps.params.projectId !== params.projectId ||
        nextProps.params.orgId !== params.orgId) {
      this.setState({
        loading: true,
        error: false
      }, this.fetchData);
    }
  },

  fetchData() {
    let params = this.props.params;

    this.api.request(`/projects/${params.orgId}/${params.projectId}/`, {
      success: (data) => {
        this.setState({
          project: data,
          loading: false,
          error: false
        });
      },
      error: () => {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  },

  render() {
    // TODO(dcramer): move sidebar into component
    if (this.state.loading)
      return <LoadingIndicator />;
    else if (this.state.error)
      return <LoadingError onRetry={this.fetchData} />;

    let urlPrefix = ConfigStore.get('urlPrefix');
    let {orgId, projectId} = this.props.params;
    let settingsUrlRoot = `/${orgId}/events/${projectId}/settings`;
    let project = this.state.project;

    return (
      <div className="row">
        <div className="col-md-2">
          <h6 className="nav-header">{t('Configuration')}</h6>
          <ul className="nav nav-stacked">
            <li>
              <IndexLink to={`${settingsUrlRoot}/`} activeClassName="active">
                {t('Project Settings')}
              </IndexLink>
            </li>
            <li>
              <Link to={`${settingsUrlRoot}/notifications/`} activeClassName="active">
                {t('Notifications')}
              </Link>
            </li>
            <li>
              <Link to={`${settingsUrlRoot}/rules/`} activeClassName="active">
                {t('Rules')}
              </Link>
            </li>
            <li>
              <Link to={`${settingsUrlRoot}/tags/`} activeClassName="active">
                {t('Tags')}
              </Link>
            </li>
            <li>
              <Link to={`${settingsUrlRoot}/issue-tracking/`} activeClassName="active">
                {t('Issue Tracking')}
              </Link>
            </li>
            <li>
              <Link to={`${settingsUrlRoot}/release-tracking/`} activeClassName="active">
                {t('Release Tracking')}
              </Link>
            </li>
          </ul>
          <h6 className="nav-header">{t('Setup')}</h6>
          <ul className="nav nav-stacked">
            <li>
              <Link to={`${settingsUrlRoot}/keys/`} activeClassName="active">
                {t('Client Keys')}
              </Link>
            </li>
          </ul>
          <h6 className="nav-header">{t('Integrations')}</h6>
          <ul className="nav nav-stacked">
            <li>
              <Link to={`${settingsUrlRoot}/plugins/`} activeClassName="active">
                {t('All Integrations')}
              </Link>
            </li>
            {project.activePlugins.map((plugin) => {
              return <li><a href={`${settingsUrlRoot}/plugins/${plugin.id}/`}>{plugin.name}</a></li>;
            })}
          </ul>
        </div>
        <div className="col-md-10">
          {React.cloneElement(this.props.children, {
            setProjectNavSection: this.props.setProjectNavSection,
            project: project
          })}
        </div>
      </div>
    );
  }
});

export default ProjectSettings;
