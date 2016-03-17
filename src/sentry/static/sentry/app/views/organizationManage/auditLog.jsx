import React from 'react';
import Reflux from 'reflux';
import {t} from '../../locale';

const OrganizationAuditLog = React.createClass({
  render() {
    return (
      <div>
        <h3>{t('Audit Log')}</h3>
      </div>
    )
  }
});

export default OrganizationAuditLog;
