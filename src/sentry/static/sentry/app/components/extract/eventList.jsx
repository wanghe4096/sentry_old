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

import EventsStore from 'stores/extract/eventsStore';
import EventAction from 'actions/extract/eventsAction'

const EventItem = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    return (
      <li className="event-item">
        <pre>
          {this.props.payload}
        </pre>
      </li>
    )
  }
});

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
    } else {
      return this.state.events.map((event, i) => {
        return (
          <EventItem {...event} key={i}/>
        )
      });
    }
  },

  render(){

    // todo: 做loading more 状态
    return (
      <div className="events-view">
        <ul>
          { this.renderBody() }
        </ul>
        <div className="load-more">
          <div className="btn btn-sm btn-default more-btn">{t('Load more')}</div>
        </div>
      </div>
    );
  }
});

export default EventList;