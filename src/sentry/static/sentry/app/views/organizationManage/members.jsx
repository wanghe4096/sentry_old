import React from 'react';
import Reflux from 'reflux';
import {t} from '../../locale';

const OrganizationMembers = React.createClass({
  render() {
    return (
      <div>
        <h3>{t('Members')}</h3>
      </div>
    )
  }
});

export default OrganizationMembers;
