/**
 * Title: extractorEvents.jsx
 * Author: bold
 * Date: 1/23/16.
 * Description: 。
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import async from 'async';
import {Link} from 'react-router';
import {t} from 'app/locale';
import _ from 'underscore';

import EventList from 'components/extract/eventList';
import EventChart from 'components/extract/eventChart';

const ExtractorEvents = React.createClass({

  render() {

    const streamId = this.props.params.streamId;
    const action = this.props.params.action;

    return (
      <div className="extractor-events">
        <div className="chart-view box">
          <EventChart streamId={streamId} action={action}/>
        </div>
        <EventList />
      </div>
    )
  }
});

export default ExtractorEvents;