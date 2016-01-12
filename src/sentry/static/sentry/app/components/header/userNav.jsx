import React from 'react';
import ConfigStore from '../../stores/configStore';
import DropdownLink from '../dropdownLink';
import Gravatar from '../gravatar';
import MenuItem from '../menuItem';
import {Link} from 'react-router';
import {t} from '../../locale';


const UserNav = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render() {
    let urlPrefix = ConfigStore.get('urlPrefix');
    let user = ConfigStore.get('user');

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
        {user.isSuperuser &&
          <MenuItem to="/manage/">{t('Admin')}</MenuItem>
        }
          {/*
          <Link
              className="btn btn-sm btn-default tip"
              to={`organizations/${org.slug}/stats/`}>{t('Stats')}</Link>
              */}
        <li>
            <Link
                to={`/`}>{t('Stats')}</Link>
        </li>
        <MenuItem href={urlPrefix + '/auth/logout/'}>{t('Sign out')}</MenuItem>
      </DropdownLink>
    );
  }
});

export default UserNav;
