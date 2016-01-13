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

import HostAction from 'actions/storage/hostAction';
import StreamAction from 'actions/storage/streamAction';
import FileAction from 'actions/storage/fileAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

import HostStat from 'components/storage/hostStat';


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
  },

  componentDidMount() {
    HostAction.fetch();
  },

  render() {

    return (
      <DocumentTitle title="storage">
        <div className="sub-app sa-storage">
          <ReactCSSTransitionGroup
            transitionName="stream-list-ani"
            component="div"
            className="stream-list-overlay"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={400}
          >
            { this.state.showManageOverlay && (<StreamList/>) }
          </ReactCSSTransitionGroup>
          <div className="container">
            <div className="row content">
              <div className="col-md-12 sub-header">
                <h5>{t('Log Storage')}</h5>
              </div>
              <div className="col-md-8">
                <HostList />
              </div>
              <div className="col-md-4">
                <HostStat />
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default StorageIndex;