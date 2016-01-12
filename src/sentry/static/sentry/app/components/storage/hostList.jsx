/**
 * Title: hostList.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import ApiMixin from '../../mixins/apiMixin';
import LoadingIndicator from '../../components/loadingIndicator';
import {t} from '../../locale';

import HostStore from '../../stores/storage/hostStore';
import StreamStore from '../../stores/storage/streamStore'
import HmStatusStore from '../../stores/storage/hostManageStatusStore';
import HmStatusAction from '../../actions/storage/hostManageStatusAction';

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
      <div className="host-item" onClick={this.onClickHandler}>
        {this.props.host_name}
        {
          this.state.active && (
            <span>(active)</span>
          )
        }
      </div>
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
  render() {

    return (
      <div className="host-list-wrap">
        <div>
          <h5>{t('Host List')}</h5>
        </div>
        <ul className="host-list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
});


export default HostList;