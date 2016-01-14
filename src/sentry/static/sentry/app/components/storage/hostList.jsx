/**
 * Title: hostList.jsx
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
import StreamStore from 'stores/storage/streamStore'
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

const HostItem = React.createClass({
  displayName: 'HostItem',

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
      active: status.activeHost === this.props.host_id
    });
  },

  onClickHandler() {
    let activeHost = HmStatusStore.status.activeHost === this.props.host_id ? null : this.props.host_id;
    HmStatusAction.setActiveHost(activeHost);
  },

  render() {
    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="item-name">
          {this.props.host_name}
        </h5>
        <ul className="clearfix props-list">
          <li>ID: {this.props.host_id} </li>
          <li>Host Type: {this.props.host_type}</li>
          <li>Stream: 10</li>
        </ul>
      </li>
    );
  }
});


const HostList = React.createClass({
  mixins: [
    Reflux.connect(HostStore, 'hostList')
  ],

  getInitialState() {
    return {
      hostList: []
    }
  },

  renderList() {
    return this.state.hostList.map((host) => {
      return (
        <HostItem {...host} key={host.host_id}></HostItem>
      )
    });
  },

  addHostHandler() {
    HostAction.add();
  },

  render() {

    return (
      <div className="list-wrap host-list">
        <div className="list-head">
          <h5>{t('Host List')}</h5>

          <button className="btn btn-sm btn-default" onClick={this.addHostHandler}>
            <span className="glyphicon glyphicon-plus"></span>
            {t('Add Host')}
          </button>

        </div>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
});


export default HostList;