import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

import ResultRawView from 'components/search/resultRawView';
import ResultTableView from 'components/search/resultTableView';

const ResultBody = React.createClass({
  getInitialState() {
    return {
      viewerType:'raw'
    }
  },
  viewerTypeToggle() {
      this.setState({
        viewerType:this.state.viewerType==='raw'?'table':'raw'
      });
  },
  render(){
    return (
      <div className="result-wrap">
        <div className="viewer-head">
          <ul className="pagination pagination-sm pull-right hide">
            <li><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
          </ul>
          <div className="btn-selector btn-group btn-group-sm">
            <a
              className={'btn ' + (this.state.viewerType==='raw'?'btn-primary':'btn-default')}
              onClick={this.viewerTypeToggle}
              title="Raw">
              <i className="glyphicon glyphicon-th-list" />
            </a>
            <a
              className={'btn ' + (this.state.viewerType==='table'?'btn-primary':'btn-default')}
              onClick={this.viewerTypeToggle}
              title="Table"
              >
              <i className="glyphicon glyphicon-th" />
            </a>
          </div>
        </div>
        {
          this.state.viewerType === 'raw' ?(<ResultRawView />):(<ResultTableView />)
        }
      </div>
    )
  }
});

export default ResultBody;
