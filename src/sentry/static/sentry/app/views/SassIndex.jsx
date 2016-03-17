import React from 'react';
import Reflux from 'reflux';
import OrganizationStore from 'stores/organizationStore';
import ConfigStore from 'stores/configStore';
import {Input} from 'react-bootstrap';
import {t} from '../locale';
import {Link} from 'react-router';



const SassIndex = React.createClass({
  mixins:[
    Reflux.connect(OrganizationStore, 'orgList')
  ],

  getInitialState() {
    return {
      org: ''
    }
  },

  handleOrg(e) {
    this.setState({
      org: e.target.value
    });
  },

  renderOrgList() {
    return this.state.orgList.map((org) => (
      <option key={org.slug} value={org.slug}>{org.name}</option>
    ));
  },

  render() {
    let org = this.context.organization || OrganizationStore.items[0];

    console.log('orgList:',this.state.orgList);
    console.log('user:',ConfigStore.get('user'));

    return (
      <div className="select-org">
        <div className="org-header">
          <h1 className="text-right">
            {/*
            <img className="img-circle  pull-left" src={`/_static/sentry/images/org-logo-normal.png`} />
            */}
            <i className="fa fa-user pull-left"></i>
            <strong>Name</strong>
            <br/>
            <div className="btn-config">
              <Link
                className="btn btn-xs btn-default"
                to={`/${org.slug}/account/settings`}
              >
                <i className="fa fa-cog"></i>
              </Link>
            </div>
          </h1>
        </div>
        <div className="org-body col-md-12">
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <select
                className="form-control select-height"
                value={this.state.org}
                onChange={this.handleOrg}>
                {this.renderOrgList()}
              </select>
            </div>
            <div className="form-group form-actions text-right">
              <Link
                className="btn btn-sm btn-logo"
                to={`/${org.slug}`}
              >
                <small>Login to LogInsight</small>
              </Link>
            </div>
            <div className="org-footer">
                <div className="text-center">
                  <Link
                    to={`/${org.slug}/manage`}
                  >
                    <small>Not organization?</small>-
                    <small>Create a new organization</small>
                  </Link>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

export default SassIndex;
