/**
 * Title: storageIndex.jsx
 * Author: bold
 * Date: 1/7/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import StreamList from './storage/streamList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HostList from 'components/storage/hostList';
import {t} from 'app/locale';

import HostStore from 'stores/storage/hostStore';
import HostAction from 'actions/storage/hostAction';
import StreamAction from 'actions/storage/streamAction';
import FileAction from 'actions/storage/fileAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

import HostStat from 'components/storage/hostStat';
import FileList from 'components/storage/fileList';

// 解决 hostlist/streamlist/filelist 空时的提醒

const StorageIndex = React.createClass({
  mixins: [
    Reflux.listenTo(HmStatusStore, 'onStatusChange')
  ],

  getInitialState(){
    return {
      showManageOverlay: false
    }
  },

  onStatusChange(status) {

    if (status.activeHost && HmStatusStore.hasChanged('activeHost')) {
      StreamAction.fetch(HmStatusStore.status.activeHost);
    }

    if (status.activeStream && HmStatusStore.hasChanged('activeStream')) {
      FileAction.fetch(HmStatusStore.status.activeStream);
    }

    this.setState({
      showManageOverlay: !!status.activeHost
    });

    if (status.activeHost) {
      document.body.scrollTop = 0;
      $('body').css('overflow-y', 'hidden');
    } else {
      $('body').css('overflow-y', 'auto');
    }
  },

  componentDidMount() {
    $(document).on('keydown', this.keyDownHandler);
    $(document).on('scroll', this.scrollHandler);
    HostAction.fetch();
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
    $(document).off('scroll', this.scrollHandler);
  },

  scrollHandler(e) {
    //if (HmStatusStore.status.activeHost) {
    //  e.preventDefault();
    //  document.body.scrollTop = 0;
    //}
  },

  keyDownHandler(evt){
    if (evt.keyCode === 27) {
      HmStatusAction.setActiveHost(null);
    }
  },

  render() {

    const showFileOverlay = !!HmStatusStore.status.activeStream;

    return (
      <DocumentTitle title="Storage">
        <div className="row">
          <ReactCSSTransitionGroup
            transitionName="stream-list-ani"
            component="div"
            className="stream-list-overlay"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            { this.state.showManageOverlay && (<StreamList/>) }
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="file-list-ani"
            component="div"
            className="file-list-overlay"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            { showFileOverlay && (<FileList />) }
          </ReactCSSTransitionGroup>
          <div className="col-md-8">
            <HostList />
          </div>
          <div className="col-md-4">
            <HostStat />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default StorageIndex;