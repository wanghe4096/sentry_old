/**
 *
 * [DEPRECATED] by bold
 *
 */

import React from 'react';
import {Link} from 'react-router';
import MenuItem from '../menuItem';
import DropdownLink from '../dropdownLink';
import AppState from '../../mixins/appState';
import OrganizationStore from '../../stores/organizationStore';
import ConfigStore from '../../stores/configStore';
import {t} from '../../locale';

const OrganizationSelector = React.createClass({
  mixins: [
    AppState,
  ],

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.organization || {}).id !== (this.props.organization || {}).id;
  },

  render() {
    let singleOrganization = ConfigStore.get('singleOrganization');
    let activeOrg = this.props.organization;

    if (singleOrganization || !activeOrg) {
      return null;
    }

    let features = ConfigStore.get('features');

    return (
      <Link to={`/${activeOrg.slug}/events/`} className="pull-right" style={{fontSize:14}}>{activeOrg.name}</Link>
    );

    /*
    return (
      <DropdownLink
          menuClasses="dropdown-menu-right"
          topLevelClasses={(this.props.className || '') + ' org-selector'}
          title={activeOrg.name}>
        {OrganizationStore.getAll().map((org) => {
          return (
            <MenuItem key={org.slug} to={`/${org.slug}/events/`}
                      isActive={activeOrg.id === org.id}>
              {org.name}
            </MenuItem>
          );
        })}
        {features.has('organizations:create') && OrganizationStore.getAll().length &&
          <MenuItem divider={true} />
        }
        {{features.has('organizations:create') &&
          <MenuItem href={urlPrefix + '/organizations/new/'}>{t('New Organization')}</MenuItem>
        }}
      </DropdownLink>
    );
    */
  }
});

export default OrganizationSelector;
