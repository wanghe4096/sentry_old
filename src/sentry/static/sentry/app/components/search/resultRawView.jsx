import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import moment from 'moment';

const RawItem = React.createClass({
  render() {
    return (
      <tr>
        <td className="ct-row">
          <span className="fold-btn glyphicon glyphicon-triangle-right"></span>
        </td>
        <td className="search-table-timefield">
          { moment(this.props._timestamp).format('YYYY-MM-DD hh:mm:ss')}
        </td>
        <td className="search-table-sourcefield">
          { this.props._raw }
        </td>
      </tr>
    )
  }
});


const ResultRawView = React.createClass({
  getInitialState(){
    return {
    }
  },
  render() {
    return (
      <div className="result-view result-view-raw">
        <table className="re-table">
          <thead>
            <tr>
              <th className="ct-row">#</th>
              <th>
                time
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                _raw_source
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.result.map((item,i)=>{
                return (
                  <RawItem {...item} key={i} />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
});

export default ResultRawView;
