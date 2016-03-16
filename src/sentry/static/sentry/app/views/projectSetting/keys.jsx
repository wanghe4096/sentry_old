import React from 'react';
import OrganizationState from 'mixins/organizationState';
import {t} from '../../locale';
import ApiMixin from 'mixins/apiMixin';
import AlertActions from 'actions/alertActions.jsx';

const PSKeys = React.createClass({
  mixins: [
    OrganizationState,
    ApiMixin
  ],
  getInitialState() {
    return {
      key_list: [
        {
          id:1,
          label:'xxxx',
          public_key: 'xxx_key',
          is_active: false,
          dsn_private: 'http://3ae02eef7c21480a90e6362eba9d4787:73950180251e48fe8d0e757043654728@192.168.1.69:9000/2/'
        }
      ]
    }
  },
  renderBody() {
    let access = this.getAccess();

    return this.state.key_list.map((k, i) => {
      return (
        <div className="client-key-item" key={i} >
          {
            access.has('project:write') && (
              <div className="pull-right btn-group btn-group-sm">
                <button className="btn btn-default"> {t('Info')} </button>
                <button className="btn btn-default">
                  { k.is_active ? t('Enable') : t('Disable') }
                </button>
                <button className="btn btn-default btn-revoke"> {t('Revoke')} </button>
              </div>
            )
          }
          <h5>{ k.label || k.public_key }</h5>
          <div className="form-control disabled auto-select">
            { k.dsn_private }
          </div>
        </div>
      )
    })
  },
  render() {
    let access = this.getAccess();
    return(
      <div>
        <div>
          <h2>Client Keys</h2>
          {
            access.has('project:write') && (
              <button type="submit" className="btn btn-primary pull-right">
                {t('Generate New Key')}
              </button>
            )
          }
        </div>
        <p>
          To send data to LogInsight you will need to configure an SDK
          with a client key (usually referred to as the
          <code>LOGINSIGHT_DSN</code>
           value). For more information on integrating LogInsight with
           your application take a look at our
         <a href="https://docs.loginsiht.cn">documentation</a>.
        </p>
        <div className="client-key-list">
          { this.renderBody() }
        </div>
      </div>
    )
  }
});

export default PSKeys;
