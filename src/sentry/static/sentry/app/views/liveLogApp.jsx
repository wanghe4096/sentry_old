import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import Pane from 'components/livelog/pane';

const style = require('css/liveLog.less');

const LiveLogApp = React.createClass({
  componentWillMount() {
    style.use();
  },

  componentWillUnmount() {
    style.unuse();
  },
  render() {
    return (
      <DocumentTitle title="Live Tail">
        <div className="sub-app sa-livelog">
          <div className="livelog-header">
            <h4 className="app-tit">Live Log</h4>
          </div>
          <div className="app-body">
            <Pane />
            <Pane />
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default LiveLogApp;
