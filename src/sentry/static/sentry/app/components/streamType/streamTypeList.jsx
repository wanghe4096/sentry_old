/**
 * Title: hostManage.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import ApiMixin from 'mixins/apiMixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';
import {t} from 'app/locale';
import moment from 'moment';

import HostStore from 'stores/streamtype/streamtypeStore';
import HostAction from 'actions/streamtype/hostAction';
import StreamStore from 'stores/streamtype/streamStore';
import StreamAction from 'actions/streamtype/streamAction';
import HmStatusStore from 'stores/streamtype/hostManageStatusStore';
import HmStatusAction from 'actions/streamtype/hostManageStatusAction';

const StreamTypeItem = React.createClass({
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

  render() {
    const createdTime = moment(this.props.create_timestamp).format('YYYY-MM-DD HH:mm:ss');
    const updateTime = moment(this.props.last_timestamp).format('YYYY-MM-DD HH:mm:ss');
    return (
      <li className={`list-item streamtype-box ${this.state.active ? 'active' : ''}`}>
        <h5 className="item-name box-header">
          {this.props.stream_name}
        </h5>
        <ul className="clearfix props-list box-content">
          <li><strong>{t('Stream ID')}:</strong> {this.props.id} </li>
          <li><strong>{t('Latest Updated')}:</strong> {updateTime} </li>
          <li><strong>{t('Created Time')}:</strong> {createdTime}</li>
        </ul>
      </li>
    );
  }
});


// todo:需要考虑stream的分页 ,可能涉及到 Reflux.filter
const StreamTypeList = React.createClass({
  mixins: [
    Reflux.connect(StreamStore, 'streamList')
  ],

  getInitialState() {
    return {
      streamList: [],
      activeNav: 'hosts',
    }
  },

  toggleStreamType(nav) {
    this.setState({
      activeNav: nav
    });
  },

  onStatChange(stream) {

  },

  componentWillMount() {

  },

  renderBody() {
    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      );
    } else if (this.state.error) {
      return (
        <LoadingError onRetry={()=>{
          StreamAction.fetch(HmStatusStore.status.activeHost);
        }}/>
      )
    } else if (!this.state.streamList.length) {
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"/>
          <p>{t('Sorry, not found.')}</p>
        </div>
      );
    } else {
      switch (this.state.activeNav) {
        case 'hosts':
          return this.state.streamList.map((stream) => {
            return (
              <StreamTypeItem {...stream} key={stream.id}/>
            )
          });
          break;
        case 'hostgroup':
          return (
            <div>
              hostgroup
            </div>
          );
          break;
        case 'extract':

          return [
            {
              name:'structure',
              key:'structure',
              desc:'结构化抽取'
            },
            {
              name:'reg',
              key:'reg',
              desc:'reg抽取'
            },
            {
              name:'gorker',
              key:'gorker',
              desc:'gorker抽取'
            }
          ].map((n, i) => {
            return (
              <li className={`list-item streamtype-box`} key={i} onClick={() => {

              }}>
                <h5 className="item-name box-header">{n.name}</h5>
                <ul className="clearfix props-list box-content">
                  <li><input type="checkbox"/></li>
                  <li><strong>{n.desc}</strong></li>
                </ul>
              </li>
            )
          });
          break;
      }
    }
  },

  render() {

    const showFileOverlay = !!HmStatusStore.status.activeStream;
    let activeNav = this.state.activeNav;

    return (
      <div className={`stream-list-container streamtype-container`}>
        <div className="list-wrap stream-list">
          <div className="list-head">
            <ul className="nav nav-tabs border-bottom">
              <li className={activeNav === 'hosts' && 'active'}>
                <a onClick={this.toggleStreamType.bind(this, 'hosts')}>{t('hosts')}</a>
              </li>
              <li className={(activeNav === 'hostgroup' && 'active') + ' hide'}>
                <a onClick={this.toggleStreamType.bind(this, 'hostgroup')}>{t('hostGroup')}</a>
              </li>
              <li className={activeNav === 'extract' && 'active'}>
                <a onClick={this.toggleStreamType.bind(this, 'extract')}>{t('extract')}</a>
              </li>
            </ul>
          </div>
          <ul>
            { this.renderBody() }
          </ul>
        </div>
      </div>
    )
  }
});

export default StreamTypeList;
