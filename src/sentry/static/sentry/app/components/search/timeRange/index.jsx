import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import PropTypes from 'app/proptypes';
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import TimeStore from 'stores/search/timeStore';
import TimeAction from 'actions/search/timeAction';
import AbsoluteTimeSelect from 'components/search/timeRange/absolute';
import RelativeTimeSelect from 'components/search/timeRange/relative';

import style from 'less/search/timepicker.less';

const TimeRange = React.createClass({
  mixins:[
    Reflux.connect(TimeStore,'timeRange')
  ],
  getInitialState() {
    return {
      // timeRange defined in timestore
    }
  },
  componentWillMount() {
    style.use();
  },
  componentWillUnmount() {
    style.unuse();
  },
  onApplyHandler(mode,data) {
    console.log('on apply:',mode,data);
    TimeAction.set(mode,data);
  },
  render() {
    // console.log('time range:',this.state.timeRange);
    const timeRangeMode = this.state.timeRange.mode;
    return (
      <div className="time-picker-wrap">
        <ul className="nav nav-pills nav-stacked" role="tablist">
          <li role="presentation" className="hide">
            <a href="#quick" role="tab" data-toggle="tab">Quick</a>
          </li>
          <li role="presentation" className={timeRangeMode ==='relative'?`active`:''}>
            <a href="#relative" role="tab" data-toggle="tab">Relative</a>
          </li>
          <li role="presentation" className={timeRangeMode ==='absolute'?`active`:''}>
            <a href="#absolute" role="tab" data-toggle="tab">Absolute</a>
          </li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane" id="quick">quick</div>
          <div role="tabpanel" className="tab-pane active" id="relative">
            <RelativeTimeSelect onApply={this.onApplyHandler} />
          </div>
          <div role="tabpanel" className="tab-pane" id="absolute">
            <AbsoluteTimeSelect onApply={this.onApplyHandler} />
          </div>
        </div>
      </div>
    )
  }
});

export default TimeRange;
