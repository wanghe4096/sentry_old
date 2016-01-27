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
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],

  getInitialState() {

    return {
      streamId: this.props.params.streamId,
      action: this.props.params.action,
      error: false,
      loading: false,
      isRuned: false,
      isRuning: false, // running 与 loading 是两个概念!!
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
    this.setState({
      loading: false
    });
  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning
    });
  },

  runBtnHandler() {

    const org = this.getOrganization();
    const {streamId,action} = this.props.params;
    const rolePath = `/${org.slug}/extract/${streamId}/${action}/role/`;
    const isRoleActive = this.props.history.isActive(rolePath);

    !isRoleActive && this.props.history.pushState(null, rolePath);

    // runing 状态必须在此更改为true,除非action内可以设置 status store
    ExtractorStatusActions.setRuningStatus(true);

    setTimeout(() => {
      ExtractorActions.run(this.state.streamId, this.state.action);
    }, 0)

  },

  renderControlView() {

    const org = this.getOrganization();
    const {streamId,action} = this.props.params;

    const basePath = `/${org.slug}/extract/${streamId}/${action}`;

    return (
      <div className="control-group clearfix">
        <div className="btn-toolbar pull-right">
          <div className="btn-group btn-group-sm tab-btn">
            <IndexLink className="btn btn-default" to={`${basePath}/`} activeClassName="btn-primary">
              {t('Events')}
            </IndexLink>
            <Link className="btn btn-default " to={`${basePath}/role`} activeClassName="btn-primary">
              {t('Role')}
            </Link>
          </div>
          { this.state.isRuning ?
            (
              <button className="btn btn-sm btn-run" disabled>{t('Runing')}</button>
            ) :
            (
              <button
                onClick={this.runBtnHandler}
                className="btn btn-sm btn-success btn-run"
              >{t('Run')}</button>
            )
          }
        </div>
        <TimeRange />
      </div>
    )
  },

  render() {

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
        <div className="extractor-container">
          <div className="sub-header">
            <div className="nav pull-left">{t('Log Structure')}</div>
            { this.renderControlView() }
          </div>
          { React.cloneElement(this.props.children) }
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractorApp;