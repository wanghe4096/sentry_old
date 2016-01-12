/**
 * Title: storageIndex.jsx
 * Author: bold
 * Date: 1/7/16.
 * Description: 。
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import HostManage from './storage/hostManage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HostList from 'components/storage/hostList';
import {t} from 'app/locale';

import HostStore from 'stores/storage/hostStore';
import HostAction from 'actions/storage/hostAction';
import HmStatusStore from 'stores/storage/hostManageStatusStore';
import HmStatusAction from 'actions/storage/hostManageStatusAction';

import HostStat from 'components/storage/hostStat';


const StorageIndex = React.createClass({
  mixins:[

  ],

  getInitialState(){
    return {
      showManageOverlay: false
    }
  },

  componentDidMount(){
    HostAction.fetch();
  },

  render() {
    return (
      <DocumentTitle title="storage">
        <div className="sub-app sa-storage">
          <ReactCSSTransitionGroup
            transitionName="host-mng-ani"
            component="div"
            className="host-mng-overlay"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={400}
          >
            {
              this.state.showManageOverlay && (
                <HostManage></HostManage>
              )
            }
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