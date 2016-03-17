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
                to={`/${org.slug}/manage`}
              >
                <i className="fa fa-cog"></i>
              </Link>
            </div>
          </h1>
        </div>
        <div className="org-body col-md-12">
          <form onSubmit={this.submitHandler}>
            <Input type="select" label={t('Select your organization')} placeholder="select" className="select-height">
              <option value="select">organization1</option>
              <option value="other">organization2</option>
            </Input>
            
            <div className="form-group form-actions text-right">
              <button type="submit" className="btn btn-sm btn-logo">
                 Login to LogInsight
              </button>
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
