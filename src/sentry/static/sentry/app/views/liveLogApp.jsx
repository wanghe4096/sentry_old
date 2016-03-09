import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import Pane from 'components/livelog/pane';
import HostAction from 'actions/livelog/hostAction';
import HostStore from 'stores/livelog/hostStore';
import StreamAction from 'actions/livelog/streamAction';
import StreamStore from 'stores/livelog/streamStore';

const style = require('css/liveLog.less');
require('!script!static/js/pushstream.js');

const LiveLogApp = React.createClass({
  componentWillMount() {
    HostAction.fetch();

    style.use();

    this.pushstream = new PushStream({
      host: '192.168.1.71',
      port: '8080',
      modes: "eventsource|stream"
    });
    this.pushstream.onmessage = this.onMessage;
    this.pushstream.onstatuschange = this.onStatusChange;

    // this.pushstream.sendMessage('Name=Bob');

    // demo
    this.pushstream.addChannel('test1');
    this.pushstream.connect();

  },

  onMessage(eventMessage) {
    if(!eventMessage){
      return false;
    }
    let values;
    try{
        values = $.parseJSON(eventMessage);
    } catch(e) {
      console.log('on message parse err');
    }
    if (!values) {
      return false
    }

    // let line = values.nick + ': ' + values.text.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
    console.log('onMessage:',values)
  },

  onStatusChange(state) {
    console.log('onStatusChange:',state)
  },

  componentWillUnmount() {
    style.unuse();
    this.pushstream.removeAllChannels();
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
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default LiveLogApp;
