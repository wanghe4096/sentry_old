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
import EventList from 'components/extract/eventList';
import EventChart from 'components/extract/eventChart';
import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import ExtractorConfigStore from 'stores/extract/extractorConfigStore';
import ExtractorConfigActions from 'actions/extract/extractorConfigActions';
import StreamChartStore from 'stores/extract/streamChartStore';
import StreamChartActions from 'actions/extract/streamChartActions';
import ExtractorActions from 'actions/extract/extractorActions';
import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TemplateChart from 'components/extract/templateChart';
import TemplateEditor from 'components/extract/templateEditor';
import StructureTemplateList from 'components/extract/structureTemplateList'
import AlertActions from 'actions/alertActions';

const ExtractorCss = require('css/extract.less');

// todo: 验证 streamID,action是否合法?不合法则 replaceState -> 404

const ExtractorApp = React.createClass({
  mixins: [
    OrganizationState,
    Reflux.listenTo(ExtractorConfigStore, 'onConfigChange'),
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],

  getInitialState() {
    window.sss = this;
    window.xx = ExtractorStatusActions;
    return {
      streamId: this.props.params.streamId,
      action: this.props.params.action,
      error: false,
      loading: false,
      isRuned: false,
      isRuning: false, // running 与 loading 是两个概念!!
      showOverlay: false
    }
  },

  componentWillMount() {
    ExtractorCss.use();
    this.setState({
      loading: true
    });
    // todo:  runed的无法查看 events list 和 stream chart
    ExtractorConfigActions.fetch(this.props.params.streamId);

  },

  componentWillUnmount() {
    ExtractorCss.unuse();
  },

  onConfigChange(config) {
    this.setState({
      loading: false
    });
  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning,
      isRuned: status.isRuned
    });
  },

  unfoldHandler() {

    this.setState({
      showOverlay: true
    })

  },

  renderControlView() {

    return (
      <div className="control-group clearfix">
        <div className="btn-toolbar pull-right">
          <button
            onClick={this.unfoldHandler}
            className="btn btn-sm btn-primary btn-run"
          >{t('Role')}</button>
        </div>
        <TimeRange />
      </div>
    )
  },

  renderBody() {

    if (this.state.showOverlay && this.state.isRuned) {
      switch (this.state.action) {
        case 'structure':
          return (
            <StructureTemplateList />
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
    } else {
      return (
        <EventList />
      );
    }

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

    const {streamId,action} = this.props.params;

    //isRuned1
    return (
      <DocumentTitle title="extractor">
        <div className="extractor-container">
          <ReactCSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={350}
            transitionLeaveTimeout={500}
          >
            {
              this.state.showOverlay && (
                <ExtractorRole
                  closeHandler={() => { this.setState({showOverlay:false}) }}
                  streamId={streamId}
                  action={action}
                />
              )
            }
          </ReactCSSTransitionGroup>
          <div className="sub-header">
            <div className="nav pull-left">
              {t('Log Structure')}
              <span className="sub">> {streamId} > {action} Extractor</span>
            </div>
            { this.renderControlView() }
          </div>
          <div className="extractor-events">
            <div className="chart-view box">
              <EventChart streamId={streamId} action={action}/>
            </div>
            { this.renderBody() }
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

const ExtractorRole = React.createClass({
  mixins: [
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],

  getInitialState() {
    return {
      isRuning: false,
      isRuned: false
    }
  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning,
      isRuned: status.isRuned
    });
  },

  keyDownHandler(evt){
    if (evt.keyCode === 27) {
      this.props.closeHandler();
    }
  },

  componentDidMount() {
    $(document).on('keydown', this.keyDownHandler);
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
    ExtractorStatusActions.setRunedStatus(false);
  },

  runHandler() {

    // runing 状态必须在此更改为true,除非action内可以设置 status store
    ExtractorStatusActions.setRuningStatus(true);

    setTimeout(() => {
      ExtractorActions.run(this.props.streamId, this.props.action);
    }, 0)

  },

  saveHandler() {
    AlertActions.addAlert(t('Saved!'), 'success');
  },

  render() {
    return (
      <div className="role-layer">
        <div className="layer-backdrop"></div>
        <button type="button" className="close-overlay-btn" onClick={this.props.closeHandler}>
          <span className="fa fa-chevron-up"></span>
        </button>
        <div className="layer-head">
          <h5 className="tit">{this.props.action} Role</h5>
        </div>
        <section className="control-buttons clearfix">
          <div className="btn-toolbar">
            {
              this.state.isRuning ?
                (<button className="btn btn-sm btn-run" disabled>{t('Runing')} ...</button>) :
                (<button className="btn btn-sm btn-success" onClick={this.runHandler}>{t('Run')}</button>)
            }
            {
              this.props.action === 'structure' && (
                <button className="btn btn-sm btn-default" onClick={this.runHandler}>{t('Auto Extract')}</button>
              )
            }
            <button className="btn btn-sm btn-default" onClick={this.saveHandler}>{t('Save Role')}</button>
            <div className="btn-group btn-group-sm">
              <button type="button" className="btn btn-default">{t('Load history')}</button>
              <button type="button"
                      className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                <span className="caret"/>
                <span className="sr-only">{t('Show history')}</span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#">2015-12-13 14:22</a></li>
                <li><a href="#">2015-12-13 14:22</a></li>
                <li><a href="#">2015-12-13 14:22</a></li>
                <li role="separator" className="divider"/>
                <li><a href="#">2015-12-15 14:22</a></li>
              </ul>
            </div>
          </div>
        </section>
        <div className="chart-view box">
          <div className="template-chart-wrap pull-left">
            <TemplateChart />
          </div>
          <div className="template-editor-wrap">
            <TemplateEditor />
          </div>
        </div>
      </div>
    )
  }
});

export default ExtractorApp;