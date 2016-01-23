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

import HostStore from 'stores/storage/hostStore';
import HostAction from 'actions/storage/hostAction';
import StreamStore from 'stores/storage/streamStore';
import StreamAction from 'actions/storage/streamAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

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

  onClickHandler() {
    let activeStream = HmStatusStore.status.activeStream === this.props.id ? null : this.props.id;
    HmStatusAction.setActiveStream(activeStream);
  },

  render() {
    const createdTime = moment(this.props.create_timestamp).format('YYYY-MM-DD HH:mm:ss');
    const updateTime = moment(this.props.last_timestamp).format('YYYY-MM-DD HH:mm:ss');
    return (
      <li className={`list-item streamtype-box ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        {/**/}

        <h5 className="item-name box-header">
          {this.props.stream_name}
        </h5>
        <ul className="clearfix props-list box-content">
          <li><strong>{t('Stream ID')}:</strong> {this.props.id} </li>
          <li><strong>{t('Latest Updated')}:</strong> {updateTime} </li>
          <li><strong>{t('Created Time')}:</strong> {createdTime}</li>
        </ul>

        {/*
        <div className="box">
          <div className="box-header">
            <div className="pull-right actions hidden-xs">
              <a className="leave-team">
                {t('Leave Team')}
              </a>
              <a className="team-settings" href={urlPrefix + '/teams/' + team.slug + '/settings/'}>
                {t('Team Settings')}
              </a>
            </div>
            <h3>{team.name}</h3>
          </div>
          <div className="box-content">
            <table className="table project-list">
              <tbody>{sortArray(team.projects, function(o) {
                return o.name;
              }).map(this.renderProject)}</tbody>
            </table>
          </div>
        </div>
        */}
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
      streamList: []
    }
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
      return this.state.streamList.map((stream) => {
        return (
          <StreamTypeItem {...stream} key={stream.id}/>
        )
      });
    }
  },

  render() {

    const showFileOverlay = !!HmStatusStore.status.activeStream;

    return (
      <div
        className={`stream-list-container streamtype-container ${showFileOverlay ? `pull`:``}`}
      >
        <div className="list-wrap stream-list">
          <div className="list-head">
            <h5>{t('Stream List')}</h5>
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
