/**
 * Title: storageIndex.jsx
 * Author: bold
 * Date: 1/7/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import StreamTypeList from '../components/streamType/streamTypeList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HostList from 'components/streamType/hostList';
import {t} from 'app/locale';

import HostStore from 'stores/streamtype/streamtypeStore';
import HostAction from 'actions/streamtype/hostAction';
import StreamAction from 'actions/streamtype/streamAction';
import HmStatusStore from 'stores/streamtype/hostManageStatusStore';
import HmStatusAction from 'actions/streamtype/hostManageStatusAction';

import HostStat from 'components/streamType/hostStat';
import FileList from 'components/streamType/fileList';

// 解决 hostlist/streamlist/filelist 空时的提醒

const StreamTypeIndex = React.createClass({
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
    HostAction.fetch();
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
    HmStatusAction.setActiveHost(null);
    $('body').css('overflow-y', 'auto');
  },

  keyDownHandler(evt){
    if (evt.keyCode === 27) {
      if (HmStatusStore.status.activeStream) {
        HmStatusAction.setActiveStream(null);
      } else {
        HmStatusAction.setActiveHost(null);
      }

    }
  },

  render() {

    const showFileOverlay = !!HmStatusStore.status.activeStream;

    return (
      <DocumentTitle title="StreamType">
        <div className="sub-app sa-storage">
            <div className="container">
              <div className="row content">
                <div className="col-md-12 sub-header">
                  <h5>{t('StreamType Manage')}</h5>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <ReactCSSTransitionGroup
                      transitionName="stream-list-ani"
                      component="div"
                      className="stream-list-overlay"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                      { this.state.showManageOverlay && (<StreamTypeList/>) }
                    </ReactCSSTransitionGroup>
                    <div className="col-md-8">
                      <HostList />
                    </div>
                    <div className="col-md-4">
                      <HostStat />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </DocumentTitle>
    );
  }
});

export default StreamTypeIndex;