import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

const ResultRawView = React.createClass({
  getInitialState(){
    return {
      result:[
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
                _raw_source
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
                    <td className="search-table-sourcefield">
                      status:OK client_ip:85.178.30.13 http.content_length:211 http.phrase:OK http.code:200 http.response_headers.content_type:application/json http.request_headers.host:packetbeat.com timestamp:February 18th 2016, 14:43:15.000 client_port:59,900 query:GET /api/shippers HTTP/1.1 path:/api/shippers server:app.server3 response:HTTP/1.1 200 OK Server: nginx/1.1.19 Date: Sun, 24 Feb 2013 11:12:23 GMT Content-Type: application/json Content-Length: 211 Connection: keep-alive Set-Cookie: session="2XpsI4buefnQWPnaoiXiA36cLiU=?_fresh=STAxCi4=&_id=Uyc/XHhlOVx4OWJceGZjXHhlMVx4OWVceGQyX
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

export default ResultRawView;
