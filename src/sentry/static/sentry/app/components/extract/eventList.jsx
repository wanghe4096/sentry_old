/**
 * Title: eventList.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';
import {t} from 'app/locale';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';
import CodeMirror from 'codemirror';
import _ from 'underscore';

import EventsStore from 'stores/extract/eventsStore';
import EventAction from 'actions/extract/eventsAction'

require('codemirror/addon/selection/active-line');
require('codemirror/addon/display/placeholder.js');
require('codemirror/lib/codemirror.css');

//
//const EventItem = React.createClass({
//  getInitialState() {
//    return {}
//  },
//
//  render() {
//    return (
//      <li className="event-item">
//        <div className="code">
//          {this.props.payload}
//        </div>
//      </li>
//    )
//  }
//});

const EventList = React.createClass({
  mixins: [
    Reflux.connect(EventsStore, 'events')
  ],

  getInitialState(){
    return {
      loading: false,
      error: false,
      events: []
    }
  },

  componentWillMount() {
    // mock
    EventAction.fetch();
  },

  getValue() {
    return _.reduce(this.state.events, (memo, event) => {
      return memo + event.payload + '\n';
    }, '');
  },

  componentDidUpdate() {
    if (this.codemirror) {
      this.codemirror.setValue(this.getValue());
    }
  },

  componentDidMount() {

    this.codemirror = CodeMirror(this.refs.codeView, {
      lineNumbers: true,
      readOnly: 'nocursor',
      styleActiveLine: true,
      viewportMargin: Infinity,
      value: this.getValue(),
      mode: "javascript"
    });
  },

  renderBody(){
    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      );
    } else if (this.state.error) {
      // todo :retry action
      return (
        <LoadingError onRetry={()=>{
          alert('coming soon');
        }}/>
      )
    } else if (!this.state.events.length) {
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"/>
          <p>{t('Sorry, not found.')}</p>
        </div>
      );
    }
    //else {
    //  return this.state.events.map((event, i) => {
    //    return (
    //      <li className="event-item" key={i}>
    //        <i className="line">{i}</i>
    //        <div className="code">
    //          {this.props.payload}
    //        </div>
    //      </li>
    //    )
    //  });
    //}
  },

  render() {

    // todo: 做loading more 状态
    return (
      <div className="result-view box">
        <div className="box-header">
          <div className="pull-right actions">
            <a className="btn btn-sm btn-default hide">
              load next 50 events
              <span className="icon-skip-forward" />
            </a>
          </div>
          <h3>{t('Matched events')}</h3>
        </div>
        <div className="events-view">
          <div ref="codeView">
            { this.renderBody() }
          </div>
        </div>
      </div>
    );
  }
});

export default EventList;