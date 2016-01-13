/**
 * Title: hostManage.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import ApiMixin from 'mixins/apiMixin';
import LoadingIndicator from 'components/loadingIndicator';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {t} from 'app/locale';

import HostStore from 'stores/storage/hostStore';
import HostAction from 'actions/storage/hostAction';
import StreamStore from 'stores/storage/streamStore';
import StreamAction from 'actions/storage/streamAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

import FileList from 'components/storage/fileList';

const StreamItem = React.createClass({
  mixins: [
    Reflux.listenTo(HmStatusStore, 'onStatusChange')
  ],

  getInitialState() {
    return {
      active: false
    }
  },

  onStatusChange(status) {
    this.setState({
      active: status.activeStream === this.props.stream_id
    })
  },

  onClickHandler() {
    let activeStream = HmStatusStore.status.activeStream === this.props.stream_id ? null : this.props.stream_id;
    HmStatusAction.setActiveStream(activeStream);
  },

  render() {
    return (
      <li className={`stream-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="stream-name">
          {this.props.stream_name}
        </h5>
        <ul className="clearfix host-props-list">
          <li>ID: {this.props.stream_id} </li>
          <li>Stream Tag: {this.props.stream_tag}</li>
          <li>Files: 10</li>
        </ul>
      </li>
    );
  }
});



// todo:需要考虑stream的分页 ,可能涉及到 Reflux.filter
const StreamList = React.createClass({
  mixins: [
    Reflux.connect(StreamStore, 'streamList')
  ],

  getInitialState() {
    return {
      streamList: []
    }
  },

  onStatChange(stream) {

  },

  componentWillMount() {

  },

  renderList() {
    return this.state.streamList.map((stream)=> {
      return (
        <StreamItem {...stream} key={stream.stream_id}/>
      )
    });
  },

  render() {

    const activeHostId = HmStatusStore.status.activeHost;
    const activeHost = HostStore.getById(activeHostId);

    return (
      <div className="stream-list-container">
        <div className="list-head stream-list-head">
          <h5>Host:{activeHost.host_name} 的 Stream List</h5>
        </div>
        <ul className="stream-list">
          { this.renderList() }
        </ul>
        <ReactCSSTransitionGroup
          transitionName="file-list-ani"
          component="div"
          className="file-list-overlay"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={400}
        >
          { !!HmStatusStore.status.activeStream && (<FileList />) }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

export default StreamList;
