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
import moment from 'moment';

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
      active: false
    }
  },

  onStatusChange(status) {
    this.setState({
      active: status.activeStream === this.props.id
    })
  },

  onClickHandler() {
    let activeStream = HmStatusStore.status.activeStream === this.props.id ? null : this.props.id;
    HmStatusAction.setActiveStream(activeStream);
  },

  render() {
    const createdTime = moment(this.props.create_timestamp).format('YYYY-MM-DD HH:mm:ss');
    const updateTime = moment(this.props.last_timestamp).format('YYYY-MM-DD HH:mm:ss');
    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="item-name">
          {this.props.stream_name}
        </h5>
        <ul className="clearfix props-list">
          <li><strong>{t('Stream ID')}:</strong> {this.props.id} </li>
          <li><strong>{t('Latest Updated')}:</strong> {updateTime} </li>
          <li><strong>{t('Created Time')}:</strong> {createdTime}</li>
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
    return this.state.streamList.map((stream) => {
      return (
        <StreamItem {...stream} key={stream.id}/>
      )
    });
  },

  render() {

    const showFileOverlay = !!HmStatusStore.status.activeStream;

    return (
      <div
        className={`stream-list-container ${showFileOverlay ? `pull`:``}`}
      >
        <div className="list-wrap stream-list">
          <div className="list-head">
            <h5>{t('Stream List')}</h5>
          </div>
          <ul>
            { this.renderList() }
          </ul>
        </div>
      </div>
    )
  }
});

export default StreamList;
