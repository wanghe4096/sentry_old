import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import PropTypes from 'app/proptypes';
import DayPicker, { DateUtils } from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import TimeStore from 'stores/search/timeStore';
import TimeAction from 'actions/search/timeAction';
import "moment/locale/zh-cn";

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

function YearMonthForm({ date, localeUtils, onChange }) {

  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = function(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  }

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={ handleChange } value={ date.getMonth() }>
        { months.map((month, i) =>
          <option key={ i } value={ i }>
            { moment.months()[i] }
          </option>)
        }
      </select>
      <select name="year" onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <option key={ i } value={ year }>
            { year }
          </option>)
        }
      </select>
    </form>
  )
}

const AbsoluteTimeSelect = React.createClass({
  mixins:[
    Reflux.connect(TimeStore,'timeRange')
  ],
  getInitialState() {
    return {
      initialMonth:fromMonth,
      from:null,
      to:null
    }
  },
  handleDayClick(e, day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  },
  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      initialMonth: fromMonth,
      from: null,
      to: null
    });
  },
  render() {
    const { from, to, initialMonth } = this.state;

    const modifiers = {
      selected: day => DateUtils.isDayInRange(day, this.state)
    };

    return (
      <div className="tr-absolute-wrap">
        <div className="x-chose-header">
          { !from && !to && <p>Please select the <strong>first day</strong>.</p> }
          { from && !to && <p>Please select the <strong>last day</strong>.</p> }
          { from && to &&
            <p>
              Range:
              <span className="c-chose-val">{ moment(from).format("L") }</span> to
              <span className="c-chose-val">{ moment(to).format("L") }</span>
              <button
                className="btn btn-sm btn-default"
                style={{marginLeft:10}}
                onClick={ this.handleResetClick }>Reset</button>
            </p>
          }
        </div>

        <DayPicker
          ref="daypicker"
          initialMonth={ initialMonth }
          numberOfMonths={ 2 }
          modifiers={ modifiers }
          onDayClick={ this.handleDayClick }
          localeUtils={ LocaleUtils }
          locale="zh-cn"
          captionElement={
            <YearMonthForm onChange={ initialMonth => this.setState({ initialMonth }) } />
          }
        />
      <div className="control-btns">
          <button
            type="button"
            style={{marginRight:5}}
            disabled={!(from && to)}
            onClick={() => this.props.onApply('absolute',{from,to})}
            className="btn btn-sm btn-primary">Apply</button>
        </div>
      </div>
    )
  }
});

export default AbsoluteTimeSelect;
