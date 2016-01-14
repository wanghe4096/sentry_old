import React from 'react';

const issuesIndex = React.createClass({
  render() {
      return (
          <div className="sub-app sa-issues">
              {this.props.children}
          </div>
      )
  }
});

export default issuesIndex;