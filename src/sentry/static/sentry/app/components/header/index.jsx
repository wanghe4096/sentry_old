import React from 'react';
import ConfigStore from '../../stores/configStore';
import OrganizationState from '../../mixins/organizationState';
import {Link} from 'react-router';

import Broadcasts from './broadcasts';
import UserNav from './userNav';
import NodeNav from './nodeNav';
import AlertNav from './alertNav';
import SearchTextInput from './searchTextInput';
import OrganizationSelector from './organizationSelector';

const Header = React.createClass({
  mixins: [OrganizationState],

  render() {
    let user = ConfigStore.get('user');
    let logo;

    if (user) {
      logo = <span className="fa fa-lg fa-home icon-sentry-logo"/>;
    } else {
      logo = <span className="icon-sentry-logo-full"/>;
    }

    // NOTE: this.props.orgId not guaranteed to be specified
    return (
      <header>
        <div className="container">
          <div className="col-md-2">
            <SearchTextInput />
          </div>
          <UserNav className="pull-right" />
          <Broadcasts className="pull-right" />

          {this.props.orgId ?
            <Link to={`/${this.props.orgId}/`} className="logo pull-right">{logo}</Link>
            :
            <a href="/" className="logo pull-right">{logo}</a>
          }
          <AlertNav className="pull-right"/>
          <NodeNav className="pull-right"/>
          <OrganizationSelector organization={this.getOrganization()} className="pull-right" />
        </div>
      </header>
    );
  }
});

export default Header;
