import React from 'react';
import {Link} from 'react-router';

import AutoSelectText from '../../components/autoSelectText';
import {t, tct} from '../../locale';

const ProjectInstallOverview = React.createClass({
  getInitialState() {
    return {
      data: this.props.platformData
    };
  },

  getIntegrationLink(root, platform, display) {
    let {orgId, projectId} = this.props.params;
    return (
      <Link to={`/${orgId}/${projectId}/settings/install/${platform}/`} key={platform}>
        <div className="icon-circle-setup">
          <i className={`platformicon platformicon-${platform}`} />
        </div>
        <div className="icon-text">{display}</div>
      </Link>
    );
  },

  toggleDsn() {
    this.setState({showDsn: !this.state.showDsn});
  },

  render() {
    let data = this.state.data;
    let frameworkList = [];
    let languageList = [];

    data.platforms.forEach((platform) => {
      platform.integrations.forEach((integration) => {
        if (integration.type === 'framework')
          frameworkList.push([platform, integration]);
        else if (integration.type === 'language')
          languageList.push([platform, integration]);
      });
    });

    return (
      <div className="add-log clearfix">
        <div className="col-md-12 select-log-type">
          <div className="select-type-text">
            <h3 className="select-type-name">编程语言支持</h3>
            <ul>
              <li>直接从应用内部发送日志</li>
              <li>无需担心日志存储</li>
            </ul>
          </div>
          <div className="select-type-icon">
            {languageList.map((item) => {
              let [platform, integration] = item;
              return this.getIntegrationLink(platform.id, integration.id, integration.name);
            })}
          </div>
          <ul className="hide">
            {frameworkList.map((item) => {
              let [platform, integration] = item;
              return this.getIntegrationLink(platform.id, integration.id, integration.name);
            })}
          </ul>
        </div>

        <div className="col-md-12 hide">
          <p>
          {tct(`
             [em:Don\'t see your platform listed here?] For a complete list of
             client integrations, please visit see [docLink:our in-depth documentation].
          `, {
            em: <em />,
            docLink: <a href="https://docs.getsentry.com" />
          })}
          </p>
        </div>
      </div>
    );
  }
});

export default ProjectInstallOverview;
