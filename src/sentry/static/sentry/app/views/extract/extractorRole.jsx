/**
 * Title: extractorRole.jsx
 * Author: bold
 * Date: 1/23/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import async from 'async';
import {Link} from 'react-router';
import {t} from 'app/locale';
import _ from 'underscore';

import StructureTemplateList from 'components/extract/structureTemplateList'
import TemplateChart from 'components/extract/templateChart';
import EventList from 'components/extract/eventList';
import TemplateEdiror from 'components/extract/templateEdiror';
import ExtractorStatus from 'stores/extract/extractorStatusStore';

const ExtractorRole = React.createClass({
  mixins: [
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],
  getInitialState() {
    return {
      isRuned: false,
      streamId: this.props.params.streamId,
      action: this.props.params.action
    }
  },

  onStatusChange(status) {
    this.setState({isRuned: status.isRuned})
  },

  renderBody() {

    if (!this.state.isRuned) {
      return (
        <EventList />
      );
    }

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
  },
  render() {

    const streamId = this.props.params.streamId;
    const action = this.props.params.action;

    return (
      <div className="extract-role">
        <div className="chart-view box">
          <div className="template-chart-wrap pull-left">
            <TemplateChart />
          </div>
          <div className="template-editor-wrap">
            <TemplateEdiror {...this.props.params}/>
          </div>
        </div>
        { this.renderBody() }
      </div>
    )
  }
});

export default ExtractorRole;