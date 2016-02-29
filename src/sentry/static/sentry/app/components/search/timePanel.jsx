import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import moment from 'moment';
import PropTypes from 'app/proptypes';
import DayPicker from "react-day-picker";
import TimeRange from 'components/search/timeRange';
import TimeStore from 'stores/search/timeStore';
import TimeAction from 'actions/search/timeAction';

const TimeModal = React.createClass({
  render() {
    return (
      <div className="timerange-modal">
        <div className="modal-header">
          <button type="button" className="close">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <div className="modal-title">
            <i className="glyphicon glyphicon-time" />
            <span> Time Range</span>
          </div>
        </div>
        <div className="modal-body">
          <TimeRange />
        </div>
      </div>
    )
  }
});

const TimePanel = React.createClass({
  mixins:[
    Reflux.connect(TimeStore,'timeRange')
  ],
  getInitialState(){
      return {
        show_modal:false
      }
  },
  toggleModalHandler(){
      this.setState({
        show_modal: !this.state.show_modal
      });
  },
  renderBody() {
    const timeRange = this.state.timeRange;
    if(timeRange.type==='absolute'){
      return (
        <span className="selector">
          { moment(timeRange.data.from).format(L) }
        </span>
        <span>To</span>
        <span className="selector">
          { moment(timeRange.data.to).format(L) }
        </span>
      )
    }else{
        return (
          <span className="selector">
            {timeRange.data.value}:{timeRange.data.unit}
          </span>
        )
    }
  },
  render() {
    return (
      <div className="time-panel clearfix">
        <button className="btn-refresh btn btn-sm btn-default">
          <span className="glyphicon glyphicon-repeat"></span>
          <span> Auto Refresh</span>
        </button>
        <div
          onClick={this.toggleModalHandler}
          className="time-range-t">
          { this.renderBody() }
        </div>
        {
          this.state.show_modal && (<TimeModal />)
        }
      </div>
    )
  }
});

export default TimePanel;
