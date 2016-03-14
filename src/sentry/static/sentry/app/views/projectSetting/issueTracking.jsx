import React from 'react';

const PSIssueTracking = React.createClass({
  render() {
    return (
      <div>
        <h2>Issue Tracking</h2>
        <p>Configure issue tracking for this project to enable quick issue creation links on events.</p>
        <div className="alert alert-info alert-block">
          <p>There are no issue tracker integrations available.</p>
        </div>
      </div>
    )
  }
});

export default PSIssueTracking;
