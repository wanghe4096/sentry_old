import React from 'react';
import Reflux from 'reflux';
import OrganizationStore from 'stores/organizationStore';

const SassIndex = React.createClass({
  mixins:[
    Reflux.connect(OrganizationStore, 'orgList')
  ],
  render() {

    console.log('orgList:',this.state.orgList);

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
