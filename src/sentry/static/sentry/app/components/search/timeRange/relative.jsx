import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import moment from 'moment';
import PropTypes from 'app/proptypes';
import DayPicker, { DateUtils } from "react-day-picker";
import TimeStore from 'stores/search/timeStore';
import TimeAction from 'actions/search/timeAction';

const RelativeTimeSelect = React.createClass({
  mixins:[
    Reflux.connect(TimeStore,'timeRange')
  ],
  getInitialState() {
    return {
      validate:null
    }
  },
  onApply() {
    let unit = this.refs.unit.value;
    let value = +this.refs.value.value;
    this.props.onApply('relative',{
      unit,value
    });
  },
  validateValue(e) {
    const val = e.target.value;
    if(isNaN(val)){
      this.setState({
        validate:val
      });
    }else{
      this.setState({
        validate:null
      });
    }
  },
  render() {
      return (
        <div className="tr-relative-wrap">
          <div className="table-wrap">
            <div className="from-sec ft-sec">
              <div className="ft-sec-head">
                From:
                <span className="e-val">{moment().format('YYYY-MM-DD hh:mm:ss')}</span>
              </div>
              <div className="form-inline">
                <div className="form-group">
                  <input
                    onChange={this.validateValue}
                    className="form-control r-num"
                    type="text" ref="value" />
                  <select className="form-control" ref="unit">
                    <option value="s" label="Seconds ago">Seconds ago</option>
                    <option value="m" label="Minutes ago">Minutes ago</option>
                    <option value="h" label="Hours ago">Hours ago</option>
                    <option value="d" label="Days ago">Days ago</option>
                    <option value="w" label="Weeks ago">Weeks ago</option>
                    <option value="M" label="Months ago">Months ago</option>
                    <option value="y" label="Years ago">Years ago</option>
                  </select>
                </div>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" />
                  round to the month
                </label>
              </div>
            </div>
            <div className="to-sec ft-sec">
              <div className="ft-sec-head">To:<span className="e-val">Now</span></div>
              <div className="form-inline">
                <input className="form-control" type="text" value="Now" style={{backgroundColor:'#ccc'}} disabled={true} />
              </div>
            </div>
          </div>
          <div className="control-btns">
              <button
                type="button"
                style={{marginRight:5}}
                disabled={this.state.validate!==null}
                onClick={this.onApply}
                className="btn btn-sm btn-primary">Apply</button>
            </div>
        </div>
      )
  }
});

export default RelativeTimeSelect;
