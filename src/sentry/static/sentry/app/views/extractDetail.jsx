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
import TemplateChart from 'components/extract/templateChart';
import TimeRange  from 'components/extract/timeRange';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';

import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import ExtractorConfigStore from 'stores/extract/extractorConfigStore';
import ExtractorConfigActions from 'actions/extract/extractorConfigActions';
import StreamChartStore from 'stores/extract/streamChartStore';
import StreamChartActions from 'actions/extract/streamChartActions';
import ExtractorActions from 'actions/extract/extractorActions';
import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore'
import StructureTemplate from 'components/extract/structureTemplate'


// todo: 验证 streamID,action是否合法?不合法则 replaceState -> 404

const ExtractDetail = React.createClass({
  mixins: [
    OrganizationState,
    Reflux.listenTo(ExtractorConfigStore, 'onConfigChange'),
    Reflux.listenTo(ExtractorTemplateStore, 'onTemplateChange')
    //Reflux.listenTo(StreamChartStore, 'onStreamChartDataChange')
  ],

  getInitialState() {
    return {
      streamId: this.props.params.streamId,
      action: this.props.params.action,
      error: false,
      loading: false,
      isRuned: false,
      runing: false
    }
  },

  componentWillMount() {

    this.setState({
      loading: true
    });
    // todo:  runed的无法查看 events list 和 stream chart
    ExtractorConfigActions.fetch(this.props.params.streamId);

  },

  onConfigChange(config) {

    if (config.last_extracted_at) {
      this.setState({
        loading: false,
        isRuned: true
      });
    } else {
      this.setState({
        loading: false
      });
    }
  },

  onTemplateChange() {

    this.setState({
      runing: false
    })

  },

  runBtnHandler() {

    this.setState({
      runing: true,
      isRuned: true
    });

    setTimeout(() => {
      ExtractorActions.run(this.state.streamId, this.state.action);
    }, 0)


  },

  saveBtnHandler() {
    console.log('saving handler');
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
    const action = this.props.params.action;

    if (this.state.isRuned) {
      return (
        <TemplateChart streamId={streamId} action={action}/>
      )
    } else {
      return (
        <EventChart streamId={streamId} action={action}/>
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
    if (!this.state.isRuned) {
      return (
        <EventList />
      )
    }

    switch (this.state.action) {
      case 'structure':
        return (
          <StructureTemplate />
        );
        break;
      case 'grok':
        return (
          <div><h1>grok</h1></div>
        );
        break;
      case 'reg':
        return (
          <div><h1>reg</h1></div>
        );
        break;
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