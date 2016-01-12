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

const StorageIndex = React.createClass({
  getInitialState(){
    return {
      showManageOverlay: true
    }
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
              <div className="sa-filter col-md-12">

              </div>
              <div className="col-md-12">
                <div className="stream-result">

                  <div className="pull-left">
                    <button
                      type="button"
                      onClick={() => (this.setState({showManageOverlay:!this.state.showManageOverlay})) }>
                      show overlay
                    </button>
                    stream list
                  </div>
                  <div className="" style={{marginLeft:'200px'}}>
                    222222222222222222222222222222222222222222222222
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

export default StorageIndex;