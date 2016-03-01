import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import moment from 'moment';

const TableItem = React.createClass({
  render() {
    return (
      <tr>
        <td className="ct-row">
          <span className="fold-btn glyphicon glyphicon-triangle-right"></span>
        </td>
        <td className="search-table-timefield">
          { moment(this.props._timestamp).format('YYYY-MM-DD hh:mm:ss')}
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
        <td className="search-table-field">
          GET
        </td>
      </tr>
    )
  }
});

const ResultTableView = React.createClass({
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
                http_method
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_status
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                client_ip
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>

              <th>
                client_server
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom hide" />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.result.map((data,i)=>{
                return (
                  <TableItem key={i} {...data} />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
});

export default ResultTableView;
