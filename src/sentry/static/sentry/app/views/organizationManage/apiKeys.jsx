import React from 'react';
import Reflux from 'reflux';
import {t} from '../../locale';

const OrganizationApiKeys = React.createClass({
  render() {
    return (
      <div>
        <h3>{t('Api Keys')}</h3>
      </div>
    )
  }
});

export default OrganizationApiKeys;
