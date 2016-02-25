import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

const ResultTableView = React.createClass({
  getInitialState(){
    return {
      result:[
        1,2,3,4,1,2,3,4,1,2,3,4,
        1,2,3,4,1,2,3,4,1,2,3,4,
        1,2,3,4,1,2,3,4,1,2,3,4
      ]
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
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_method
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_status
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                client_ip
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>

              <th>
                client_server
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
              <th>
                http_xxxx
                <i className="sort-btn glyphicon glyphicon-triangle-bottom" />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.result.map((x,i)=>{
                return (
                  <tr key={i}>
                    <td className="ct-row">
                      <span className="fold-btn glyphicon glyphicon-triangle-right"></span>
                    </td>
                    <td className="search-table-timefield">
                      February 18th 2016, 14:43:15.000
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
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
});

export default ResultTableView;
