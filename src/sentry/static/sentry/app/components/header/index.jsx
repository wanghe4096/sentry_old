import React from 'react';
import ConfigStore from '../../stores/configStore';
import OrganizationState from '../../mixins/organizationState';
import {Link} from 'react-router';

import Broadcasts from './broadcasts';
import UserNav from './userNav';
import NodeNav from './nodeNav';
import AlertNav from './alertNav';
import SearchTextInput from './SearchTextInput';
import AddBtn from './AddBtn';

const Header = React.createClass({
  mixins: [OrganizationState],

  render() {
    let user = ConfigStore.get('user');
    let org = this.getOrganization();
    return (
      <header>
        <div className="container">
          <SearchTextInput />
          {/*
          <div className="col-md-2">
            <SearchTextInput />
          </div>
          */}
          <UserNav className="pull-right" />
          <Broadcasts className="pull-right" />
          <AddBtn className="pull-right" />
          {/*
          <AlertNav className="pull-right"/>
          */}
          {
            // <NodeNav className="pull-right"/>
          }
          {org && <Link to={`/${org.slug}/events/`} className="pull-right" style={{fontSize:15}}>{org.name}</Link>}
        </div>
      </header>
    );
  }
});

export default Header;
