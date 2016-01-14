import React from 'react';
import {Link} from 'react-router';
import ConfigStore from '../../stores/configStore';

import ProjectSelector from './projectSelector';
import {t} from '../../locale';

const ProjectHeader = React.createClass({
  render() {
    let navSection = this.props.activeSection;
    let urlPrefix = ConfigStore.get('urlPrefix');
    let project = this.props.project;
    let org = this.props.organization;
    let access = new Set(org.access);

    return (
      <div>
        <div className="sub-header">
          <div className="container">
            <div className="pull-right">
              <ul className="nav nav-tabs">
                <li className={navSection == 'dashboard' ? 'active' : ''}>
                  <Link to={`/${org.slug}/events/${project.slug}/dashboard/`}>
                    {t('Dashboard')}
                  </Link>
                </li>
                <li className={navSection == 'stream' ? 'active' : ''}>
                  <Link to={`/${org.slug}/events/${project.slug}/`}>
                    {t('Issues')}
                  </Link>
                </li>
                <li className={navSection == 'install' ? 'active' : ''}>
                  <Link to={`/${org.slug}/events/${project.slug}/settings/install/`}>
                    {t('接入')}
                  </Link>
                </li>
                <li className={navSection == 'releases' ? 'active' : ''}>
                  <Link to={`/${org.slug}/events/${project.slug}/releases/`}>
                    {t('Releases')}
                  </Link>
                </li>
                {access.has('project:write') &&
                  <li className={navSection == 'settings' ? 'active' : ''}>
                    <a href={urlPrefix + `/${org.slug}/events/${project.slug}/settings/`}>
                      {t('Settings')}
                    </a>
                  </li>
                }

              </ul>
            </div>
            <ProjectSelector
                organization={org}
                projectId={project.slug}/>
           </div>
        </div>
      </div>
    );
  }
});

export default ProjectHeader;
