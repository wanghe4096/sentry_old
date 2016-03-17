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
     return params.orgId + '/manage/stats/';
  },

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render() {
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
        <MenuItem to={'/account/settings/'}>{t('Account')}</MenuItem>
        <li>
          <Link
            to={`/${org.slug}/manage/stats/`}>{t('Stats')}
          </Link>
        </li>
        <MenuItem to={'/auth/logout/'}>{t('Sign out')}</MenuItem>
      </DropdownLink>
    );
  }
});

export default UserNav;
