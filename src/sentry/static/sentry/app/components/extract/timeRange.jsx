/**
 * Title: timeRange.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */


import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import {Modal} from 'react-bootstrap';
import {t} from '../../locale';
import ExtractorStatus from 'stores/extract/extractorStatusStore';

const TimeRange = React.createClass({
  mixins: [
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],

  getInitialState() {
    return {
      showDialog: false,
      startAt: new Date(),
      endAt: new Date('2016-2-30'),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
      }
    }
  },

  onStatusChange(status) {
    //console.log('status.time:',status.time);
    this.setState({
      startAt: status.time.startAt,
      endAt: status.time.endAt
    });
  },

  handleSelect() {
    console.log('range chang!!');
  },

  hideHandler() {
    this.setState({
      showDialog: false
    })
  },

  onInitDateRange(obj) {
    console.log(obj);
  },

  render() {
    const startAt = moment(this.state.startAt).format('YYYY-MM-DD');
    const endAt = moment(this.state.endAt).format('YYYY-MM-DD');

    let label = startAt == endAt ? startAt : `${startAt} ${t(' To ')} ${endAt}`;
    // xxx111

    return (
      <div className="date-range pull-right" onClick={() => {
          this.setState({showDialog:true})
        }}>
        { t('Time range') } : { label }
        <Modal
          keyboard={true}
          show={this.state.showDialog}
          onHide={this.hideHandler}>
          <Modal.Header closeButton={true}>
            <Modal.Title>{t('Time range')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DateRange
              date="2015/12/11"
              firstDayOfWeek={moment.localeData().firstDayOfWeek()}
              onInit={this.onInitDateRange}
              onChange={this.handleSelect}
            />
            <Modal.Footer>
              <button type="reset" className="btn btn-sm btn-default">{t('Reset')}</button>
              <button className="btn btn-sm btn-primary">{t('Done')}</button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
});

export default TimeRange;