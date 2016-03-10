import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import _ from 'underscore';
import Pane from 'components/livelog/pane';
import HostAction from 'actions/livelog/hostAction';
import HostStore from 'stores/livelog/hostStore';
import StreamAction from 'actions/livelog/streamAction';
import StreamStore from 'stores/livelog/streamStore';
import EventAction from 'actions/livelog/eventAction';

const style = require('css/liveLog.less');
require('!script!static/js/pushstream.js');

// TODO demo
window.xx = EventAction;

const LiveLogApp = React.createClass({
  channels: [],
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

  },

  onMessage(eventMessage) {
    if(!eventMessage){
      return false;
    }

    // TODO 日和知道当前消息是属于哪个 chanel
    EventAction.send(eventMessage);
    // eventMessage
  },

  onStatusChange(state) {
    // console.log('onStatusChange:',state)
  },

  componentWillUnmount() {
    style.unuse();
    this.pushstream.removeAllChannels();
  },
  onChannelChange(channels) {
    let newChannels = _.uniq(this.channels.concat(channels));
    this.updateChannel(newChannels);
    // console.log(channels);
  },
  updateChannel(channels) {
    if(this.channels.length && this.channels !== channels){
      this.pushstream.removeAllChannels();
    }
    channels.map((cnl,i) => {
      this.pushstream.addChannel(cnl.toString());
    });
    this.pushstream.connect();
    this.channels = channels;
  },
  render() {
    return (
      <DocumentTitle title="Live Tail">
        <div className="sub-app sa-livelog">
          <div className="livelog-header">
            <h4 className="app-tit">{t('Live Log')}</h4>
          </div>
          <div className="app-body">
            <Pane onChannelChange={ this.onChannelChange }/>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default LiveLogApp;
