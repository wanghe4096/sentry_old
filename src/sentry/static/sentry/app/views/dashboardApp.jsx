import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';

const css = require('css/search.less');

const DashboardApp = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  render() {
    return (
      <DocumentTitle title="dashboard">
        <div className="sub-app sa-dashboard">
          dashboard
        </div>
      </DocumentTitle>
    )
  }
});

export default DashboardApp;
