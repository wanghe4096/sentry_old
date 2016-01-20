/**
 * Title: structureDetail.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */


import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import async from 'async';
import {Link} from 'react-router';
import {t} from 'app/locale';
import _ from 'underscore';
import OrganizationState from 'mixins/organizationState';
import EventList from 'components/extract/eventList';
import EventChart from 'components/extract/eventChart';
import TimeRange  from 'components/extract/timeRange';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';

import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import ExtractorConfigStore from 'stores/extract/extractorConfigStore';
import ExtractorConfigActions from 'actions/extract/extractorConfigActions';
import StreamChartStore from 'stores/extract/streamChartStore';
import StreamChartActions from 'actions/extract/streamChartActions';

const ExtractDetail = React.createClass({
  mixins: [
    OrganizationState,
    Reflux.listenTo(ExtractorConfigStore, 'onConfigChange'),
    //Reflux.listenTo(StreamChartStore, 'onStreamChartDataChange')
  ],

  getInitialState() {
    return {
      error: false,
      loading: false,
      config: null,
      isRuned: false,
      runing: false
    }
  },

  componentWillMount() {
    this.initData();
  },

  initData() {

    this.setState({
      loading: true
    });
    // todo:
    // 会存在一个问题:  runed的无法查看 events list 和 stream chart
    ExtractorConfigActions.fetch(this.props.params.streamId);

  },

  onConfigChange(config) {

    if (config.last_extracted_at) {
      this.setState({
        loading:false,
        isRuned: true
      });
    } else {
      this.setState({
        loading:false
      });
    }
  },


  //onStreamChartDataChange(data) {
  //  this.setState({
  //    loading: false
  //  });
  //},

  //
  //getActionConfig(cb) {
  //
  //  const streamId = this.props.params.streamId;
  //
  //  // todo: mock data
  //  setTimeout(()=> {
  //    cb(null, {
  //      action_name: 'xxxx',
  //      stream_id: streamId,
  //      isRuned: window.location.hash === '#runed', // mock:是否已运行过
  //      options: {}
  //    })
  //  }, 300)
  //
  //},

  runBtnHandler() {
    this.setState({
      runing: true
    });
  },

  saveBtnHandler() {
    console.log('saving');
  },

  renderRunBtn() {
    if (this.state.runing) {
      return (
        <button className="btn btn-sm btn-primary">{t('Runing')}</button>
      )
    } else if (this.state.isRuned) {
      return (
        <button onClick={this.saveBtnHandler} className="btn btn-sm btn-primary">{t('Save Template')}</button>
      )
    } else {
      return (
        <button onClick={this.runBtnHandler} className="btn btn-sm btn-primary">{t('Run')}</button>
      )
    }
  },


  renderChartView() {

    const streamId = this.props.params.streamId;

    if (this.state.isRuned) {
      return (
        <div>模板列表</div>
      )
    } else {
      return (
        <EventChart streamId={streamId} />
      )
    }

  },

  renderControlView() {
    return (
      <div>
        { !this.state.isRuned && (<TimeRange />) }
        <div className="btn-toolbar">
          { this.renderRunBtn() }
        </div>
      </div>
    )
  },

  renderBodyView() {
    if (this.state.isRuned) {
      return (
        <div>模板 报表</div>
      )
    } else {
      return (
        <EventList />
      )
    }
  },

  render() {

    const org = this.getOrganization();

    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      )
    } else if (this.state.error) {
      return (
        <LoadingError
          message={t('Load initial Data failed')}
          onRetry={this.initData}
        />
      )
    }

    return (
      <DocumentTitle title="storage">
        <div className="extract-detail">
          <ol className="breadcrumb">
            <li>
              <Link to={`/${org.slug}/extract/`}>{t('Log extract')}</Link>
            </li>
            <li className="active">{t('Extractor')}:{ this.props.params.action }</li>
          </ol>
          <div className="chart-view">
            { this.renderChartView() }
          </div>
          <div className="btn-view">
            { this.renderControlView() }
          </div>
          <div className="result-view">
            { this.renderBodyView() }
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractDetail;