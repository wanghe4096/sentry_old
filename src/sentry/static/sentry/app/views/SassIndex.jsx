import React from 'react';
import Reflux from 'reflux';
import OrganizationStore from 'stores/organizationStore';
import ConfigStore from 'stores/configStore';

const SassIndex = React.createClass({
  mixins:[
    Reflux.connect(OrganizationStore, 'orgList')
  ],
  render() {

    console.log('orgList:',this.state.orgList);
    console.log('user:',ConfigStore.get('user'));

    return (
      <div>
        sass index
        <br />
        please choose org
      </div>
    )
  }
});

export default SassIndex;
