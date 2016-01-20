/**
 * Title: timeRange.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */


import React from 'react';
import Reflux from 'reflux';
import ExtractorStatus from 'stores/extract/extractorStatusStore';

const TimeRange = React.createClass({
  mixins: [
    Reflux.listenTo(ExtractorStatus,'onStatusChange')
  ],

  getInitialState() {
    return {
      startAt: null,
      endAt: null
    }
  },

  onStatusChange(status) {
    //console.log('status.time:',status.time);
    this.setState({
      startAt: status.time.startAt,
      endAt: status.time.endAt
    });
  },

  render() {
    const startAt = moment(this.state.startAt).format('YYYY-MM-DD HH:mm');
    const endAt = moment(this.state.endAt).format('YYYY-MM-DD HH:mm');

    return (
      <div className="time-range pull-right">
        Time range:<span className="time">{startAt}</span>-<span className="time">{endAt}</span>
      </div>
    )
  }
});

export default TimeRange;