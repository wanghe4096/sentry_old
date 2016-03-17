import React from 'react';
import ConfigStore from '../../stores/configStore';
import DropdownLink from '../dropdownLink';
import Gravatar from '../gravatar';
import MenuItem from '../menuItem';
import {Link} from 'react-router';
import {t} from '../../locale';
import OrganizationState from '../../mixins/organizationState';
import TooltipMixin from '../../mixins/tooltip';

const UserNav = React.createClass({
  mixins: [
     OrganizationState,
     TooltipMixin({
        selector: '.tip'
     })
  ],

  getOrganizationStatsEndpoint() {
     let params = this.props.params;
     return '/organizations/' + params.orgId + '/stats/';
  },

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render() {

    let urlPrefix = ConfigStore.get('urlPrefix');
    let user = ConfigStore.get('user');
    let org = this.getOrganization();
    
    if (!user) {
      // TODO
      return null;
    }

    let title = (
      <Gravatar email={user.email} className="avatar" />
    );

    return (
      <DropdownLink
          topLevelClasses={this.props.className}
          menuClasses="dropdown-menu-right"
          title={title}>
        <MenuItem href={urlPrefix + '/account/settings/'}>{t('Account')}</MenuItem>
        <li>
          <Link
            to={`/organizations/${org.slug}/stats/`}>{t('Stats')}
          </Link>
        </li>
        <MenuItem href={urlPrefix + '/auth/logout/'}>{t('Sign out')}</MenuItem>
      </DropdownLink>
    );
  }
});

export default UserNav;
