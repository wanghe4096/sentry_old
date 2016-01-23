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
import {Link,IndexLink} from 'react-router';
import {t} from 'app/locale';
import _ from 'underscore';
import OrganizationState from 'mixins/organizationState';

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


// todo: 验证 streamID,action是否合法?不合法则 replaceState -> 404

const ExtractorApp = React.createClass({
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

  renderControlView() {
    window.x = this.props;
    const org = this.getOrganization();
    const {streamId,action} = this.props.params;

    const basePath = `/${org.slug}/extract/${streamId}/${action}`;

    return (
      <div className="control-group clearfix">
        { false && !this.state.isRuned && (<TimeRange />) }
        <div className="btn-toolbar pull-right">
          <div className="btn-group btn-group-sm tab-btn">
            <IndexLink className="btn btn-default" to={`${basePath}/`} activeClassName="btn-primary">
              {t('Events')}
            </IndexLink>
            <Link className="btn btn-default " to={`${basePath}/role`} activeClassName="btn-primary">
              {t('Role')}
            </Link>
          </div>
          { this.state.runing ?
            (
              <button className="btn btn-sm" disabled>{t('Runing')}</button>
            ) :
            (
              <button onClick={this.runBtnHandler} className="btn btn-sm btn-success">{t('Run')}</button>
            )
          }
        </div>
      </div>
    )
  },

  render() {

    if (this.state.loading) {
      console.log('loading;');
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      )
    } else if (this.state.error) {
      console.log('error');
      return (
        <LoadingError
          message={t('Load initial Data failed')}
          onRetry={this.initData}
        />
      )
    }

    return (
      <DocumentTitle title="storage">
        <div className="extractor-container">
          <div className="sub-header">
            <h5 className="pull-left">{t('Log Structure')}</h5>
            { this.renderControlView() }
          </div>
          { React.cloneElement(this.props.children) }
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractorApp;