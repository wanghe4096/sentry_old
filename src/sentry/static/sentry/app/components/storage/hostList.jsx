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
    Reflux.listenTo(HmStatusStore, 'onHostMngStatusChange')
  ],

  getInitialState() {
    return {
      active: false
    }
  },

  onHostMngStatusChange(status){

    this.setState({
      active: status.activeHost === this.props.host_id
    });

  },

  onClickHandler() {
    HmStatusAction.setActiveHost(this.props.host_id);
  },

  render() {
    return (
      <li className={`host-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="host-name">
          {this.props.host_name}
        </h5>
        <ul className="clearfix host-props-list">
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

  propTypes: {
    activeHost: React.PropTypes.string
  },

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
      <div className="host-list-wrap">
        <div className="list-head">
          <h5>{t('Host List')}</h5>

          <button className="btn btn-sm btn-default" onClick={this.addHostHandler}>
            <span className="glyphicon glyphicon-plus"></span>
            {t('Add Host')}
          </button>

        </div>
        <ul className="host-list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
});


export default HostList;