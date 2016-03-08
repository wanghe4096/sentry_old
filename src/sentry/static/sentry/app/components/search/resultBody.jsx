import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import ResultRawView from 'components/search/resultRawView';
import ResultTableView from 'components/search/resultTableView';
import SearchAction from 'actions/search/searchAction';
import SearchStore from 'stores/search/searchStore';
import ResultStore from 'stores/search/resultStore';


const ResultBody = React.createClass({
  mixins:[
    Reflux.connect(ResultStore,'result'),
    Reflux.listenTo(SearchStore,'onSearchParamsChange')
  ],
  getInitialState() {
    return {
      viewerType:'raw'
    }
  },
  onSearchParamsChange(searchParams) {
    console.log('resultBody.jsx, on search params change:', searchParams);
    // TODO: will call resultBody Action
  },
  viewerTypeToggle() {
      this.setState({
        viewerType:this.state.viewerType==='raw'?'table':'raw'
      });
  },
  componentWillMount() {
    // TODO 此处每次进入都得重新获取，后续需要优化
    SearchAction.fetch(SearchStore.query, SearchStore.timeRange);
  },
  renderBody() {
    if(this.state.viewerType === 'raw'){
      return (
        <ResultRawView result={this.state.result} />
      )
    }else{
      return (
        <ResultTableView result={this.state.result} />
      )
    }
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
              <i className="fa fa-th-list" />
            </a>
            <a
              className={'btn ' + (this.state.viewerType==='table'?'btn-primary':'btn-default')}
              onClick={this.viewerTypeToggle}
              title="Table"
              >
              <i className="fa fa-table" />
            </a>
          </div>
        </div>
        { this.renderBody() }
      </div>
    )
  }
});

export default ResultBody;
