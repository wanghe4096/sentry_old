import React from 'react';
import Reflux from 'reflux';
import {t} from '../../locale';

const OrganizationAuth = React.createClass({
  render() {
    return (
      <div>
        <h3>{t('Auth')}</h3>
      </div>
    )
  }
});

export default OrganizationAuth;
