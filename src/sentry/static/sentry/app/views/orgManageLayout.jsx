import React from 'react';
import Reflux from 'reflux';
import PropTypes from '../proptypes';
import {t} from '../locale';
import {Link, IndexLink} from 'react-router';
import OrganizationState from 'mixins/organizationState';

const OrgManageLayout = React.createClass({
  mixins: [
    OrganizationState
  ],
  contextTypes: {
    organization: PropTypes.Organization
  },
  render() {
    const org = this.context.organization;
    let access = this.getAccess();
    let features = this.getFeatures();

    return (
      <div className="sub-app sa-org-manage">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <h6 className="nav-header">{t('General')}</h6>
              <ul className="nav nav-stacked">
                { access.has('org:read') && (
                  <li>
                    <Link to={`/${org.slug}/manage/stats/`} activeClassName="active">
                      {t('Organization Stats')}
                    </Link>
                  </li>
                )}
              </ul>
              <h6 className="nav-header">{t('Manage')}</h6>
              <ul className="nav nav-stacked">
                {access.has('org:read') &&
                  <li>
                    <Link to={`/${org.slug}/manage/members/`} activeClassName="active">
                      {t('Members')}&nbsp;
                      {access.has('org:write') && org.pendingAccessRequests > 0 &&
                        <span className="badge" style={{marginLeft: 5}}>{org.pendingAccessRequests}</span>
                      }
                    </Link>
                  </li>
                }
                {features.has('sso') && access.has('org:write') && (
                  <li>
                    <Link to={`/${org.slug}/manage/auth/`} activeClassName="active">
                      {t('Auth')}
                    </Link>
                  </li>
                )}
                {access.has('org:write') && (
                  <li>
                    <Link to={`/${org.slug}/manage/api-keys/`} activeClassName="active">
                      {t('API Keys')}
                    </Link>
                  </li>
                )}
                {access.has('org:write') && (
                  <li>
                    <Link to={`/${org.slug}/manage/audit-log/`} activeClassName="active">
                      {t('Audit Log')}
                    </Link>
                  </li>
                )}
                <li>
                  <Link to={`/${org.slug}/manage/rate-limits/`} activeClassName="active">
                    {t('Rate Limits')}
                  </Link>
                </li>
                {access.has('org:write') && (
                  <li>
                    <Link to={`/${org.slug}/manage/settings/`} activeClassName="active">
                      {t('Settings')}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-10">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default OrgManageLayout;
