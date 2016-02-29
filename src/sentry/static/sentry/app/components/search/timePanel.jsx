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
  onClose() {
    this.props.onClose();
  },
  render() {
    return (
      <div className="timerange-modal">
        <div className="modal-header">
          <button
            onClick={this.onClose}
            type="button" className="close">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <div className="modal-title">
            <i className="glyphicon glyphicon-time" />
            <span> Time Range</span>
          </div>
        </div>
        <div className="modal-body">
          <TimeRange {...this.props} />
        </div>
      </div>
    )
  }
});

const TimePanel = React.createClass({
  mixins:[
    Reflux.connect(TimeStore,'timeRange')
  ],

  getInitialState() {
      return {
        show_modal:false
      }
  },

  keyDownHandler(evt) {
    if (evt.keyCode === 27) {
      this.setState({show_modal:false})
    }
  },

  componentDidMount() {
    $(document).on('keydown', this.keyDownHandler);
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
  },

  toggleModalHandler(){
      this.setState({
        show_modal: !this.state.show_modal
      });
  },
  renderBody() {
    const timeRange = this.state.timeRange;
    if(timeRange.mode==='absolute'){
      return (
        <span>
          <span className="selector">
            { moment(timeRange.data.from).format('YYYY-MM-DD hh:mm:ss') }
          </span>
          to
          <span className="selector">
            { moment(timeRange.data.to).format('YYYY-MM-DD hh:mm:ss') }
          </span>
        </span>
      )
    }else{
        return (
          <div>
            <span className="selector">
              {timeRange.data.value} {
                {
                  's':'second',
                  'm':'minute',
                  'h':'hours',
                  'd':'day',
                  'w':'week',
                  'M':'month',
                  'y':'year'
                }[timeRange.data.unit]
              } ago
            </span>
            to
            <span className="selector">Now</span>
          </div>
        )
    }
  },
  render() {
    return (
      <div className="time-panel clearfix">
        <button className="btn-refresh btn btn-sm btn-default" disabled={true}>
          <span className="glyphicon glyphicon-repeat"></span>
          <span> Auto Refresh</span>
        </button>
        <div
          onClick={this.toggleModalHandler}
          className="time-range-t">
          { this.renderBody() }
        </div>
        {
          this.state.show_modal && (<TimeModal onClose={() => this.setState({show_modal:false})} />)
        }
      </div>
    )
  }
});

export default TimePanel;
