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
import {t} from 'app/locale';

import HostStore from 'stores/storage/hostStore';
import HostAction from 'actions/storage/hostAction';
import StreamStore from 'stores/storage/streamStore';
import StreamAction from 'actions/storage/streamAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';


const StreamItem = React.createClass({
  mixins: [
    Reflux.listenTo(HmStatusStore, 'onStatusChange')
  ],

  getInitialState() {
    return {
      //loading: true,
      active: false
    }
  },

  onStatusChange(status) {
    this.setState({
      active: status.activeStream === this.props.stream.stream_id
    })
  },

  onClickHandler() {
    let activeStream = HmStatusStore.status.activeStream === this.props.stream_id ? null : this.props.stream_id;
    HmStatusAction.setActiveStream(activeStream);
  },

  render() {
    return (
      <li className={`host-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="stream-name">
          {this.props.stream_name}
        </h5>
      </li>
    );
  }
});

const StreamList = React.createClass({
  mixins: [
    Reflux.connect(StreamStore, 'streamList')
  ],

  getInitialState() {
    return {
      streamList: []
    }
  },

  onStatChange(stream){

  },

  componentWillMount() {

  },

  renderList() {
    this.state.streamList.map((stream)=> {
      return (
        <StreamItem {...stream} key={stream.stream_id}/>
      )
    });
  },

  render() {
    return (
      <div className="stream-list-container">
        <ul className="stream-list">
          { this.renderList() }
        </ul>
      </div>
    )
  }
});

export default StreamList;
