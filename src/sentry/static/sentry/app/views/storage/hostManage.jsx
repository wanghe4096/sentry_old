/**
 * Title: hostManage.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import ApiMixin from '../../mixins/apiMixin';
import LoadingIndicator from '../../components/loadingIndicator';
import HostList from '../../components/storage/hostList';
import {t} from '../../locale';

import HostStore from '../../stores/storage/hostStore';
import HostAction from '../../actions/storage/hostAction';
import StreamStore from '../../stores/storage/streamStore';
import StreamAction from '../../actions/storage/streamAction';
import HmStatusStore from '../../stores/storage/hostManageStatusStore';
import HmStatusAction from '../../actions/storage/hostManageStatusAction';


const StreamList = React.createClass({
  render() {
    return false;
  }
});

const FileList = React.createClass({
  render() {
    return false;
  }
});


const HostManage = React.createClass({
  mixins: [
    ApiMixin,
    Reflux.connect(HostStore, "hostList")
  ],

  getInitialState() {
    return {
      hostList: [],
      activeHost: null
    }
  },

  componentWillMount(){
    HostAction.fetch();
  },

  changeHost(id) {
    this.setState({
      host: id,
      stream: null
    });
  },

  fetchStream(hostId) {
    //this.api.request('')
  },

  onStreamChange(streamList) {
    if (streamList.length) {
      this.setState({
        stream: streamList[0].stream_id
      });
    }
  },

  render() {
    return (
      <div className="host-mng-container">
        <div className="host-mng-head">
          <h4>Host Manage</h4>
        </div>

        <HostList/>
        <StreamList />
        <FileList />

      </div>
    )
  }
});

export default HostManage;
