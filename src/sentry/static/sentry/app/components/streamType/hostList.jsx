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
import LoadingError from 'components/loadingError';
import {t} from 'app/locale';

import HostStore from 'stores/streamtype/streamtypeStore';
import HostAction from 'actions/streamtype/hostAction';
import StreamStore from 'stores/streamtype/streamStore'
import HmStatusStore from 'stores/streamtype/hostManageStatusStore';
import HmStatusAction from 'actions/streamtype/hostManageStatusAction';
import GroupCheckBox from '../streamType/groupCheckBox';

const HostItem = React.createClass({
  displayName: 'HostItem',

  mixins: [
    Reflux.listenTo(HmStatusStore, 'onStatusChange')
  ],

  getInitialState() {
    return {
      active: false,
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
      <li className={`list-item streamtype-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <label className="checkbox">
          <GroupCheckBox id={this.props.id}/>
        </label>
        <h5 className="item-name">
          {this.props.host_name}
        </h5>
        <span className="item-desc"><strong>desc:</strong>{this.props.desc}</span>
        <ul className="clearfix props-list">
          <li><strong>{t('Host ID')}:</strong> {this.props.id} </li>
          <li><strong>{t('Distver')}:</strong> {this.props.distver} </li>
          <li><strong>{t('System')}:</strong> {this.props.system} </li>
          <li><strong>{t('Extract')}:</strong> {this.props.extract} </li>
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

  renderBody() {

    // todo: 此处需要实现loading 状态

    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      );
    } else if (this.state.error) {
      return (
        <LoadingError onRetry={()=>{
          HostAction.fetch();
        }}/>
      )
    } else if (!this.state.hostList.length) {
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"/>
          <p>{t('Sorry, no streamtype match your account.')}</p>
        </div>
      );
    } else {
      return this.state.hostList.map((host, i) => {
        return (
          <HostItem {...host} key={i}/>
        )
      });
    }
  },

  addHostHandler() {
    HostAction.add();
  },

  render() {

    return (
      <div className="list-wrap host-list">
        <div className="list-head streamtype-select-all">

          <div className="checkbox">
            <input type="checkbox" className="chk-select-all"
                   onChange={this.onSelectAll}
                   checked={this.state.pageSelected} />
          </div>

          <h5>{t('StreamType')}</h5>

          <button className="btn btn-sm btn-default pull-right" onClick={this.deleteHostHandler}>
            <span className="fa fa-times"></span>
            {t('delete')}
          </button>

          <button className="btn btn-sm btn-default pull-right" onClick={this.removeHostHandler}>
            <span className="fa fa-pencil"></span>
            {t('edit')}
          </button>

          <button className="btn btn-sm btn-default pull-right" onClick={this.addHostHandler}>
            <span className="fa fa-plus"></span>
            {t('add streamtype')}
          </button>

        </div>
        <ul>
          {this.renderBody()}
        </ul>
      </div>
    );
  }
});


export default HostList;