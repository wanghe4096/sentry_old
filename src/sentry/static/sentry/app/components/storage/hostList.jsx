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
      active: status.activeHost === this.props.id
    });
  },

  onClickHandler() {
    let activeHost = HmStatusStore.status.activeHost === this.props.id ? null : this.props.id;
    HmStatusAction.setActiveHost(activeHost);
  },

  render() {
    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="item-name">
          {this.props.host_name}
        </h5>
        <ul className="clearfix props-list">
          <li><strong>Host ID:</strong> {this.props.id} </li>
          <li><strong>Distver:</strong> {this.props.distver} </li>
          <li><strong>Host Key:</strong> {this.props.host_key} </li>
          <li><strong>Host Type:</strong> {this.props.host_type}</li>
          <li><strong>System: </strong> {this.props.system}</li>
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
    return this.state.hostList.map((host,i) => {
      console.log(host);
      return (
        <HostItem {...host} key={i}></HostItem>
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