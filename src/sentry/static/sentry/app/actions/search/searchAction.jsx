import Reflux from 'reflux';
import {Client} from './../../api';
import _ from 'underscore';

const SearchAction = Reflux.createActions({
  fetch: {
    children:['success','failed']
  },
});

SearchAction.fetch.listen(function(query,timeRange,options = {}) {
  var that = this;
  // new Client().request('/search', {
  //   data:{
  //
  //   },
  //   success: function(data) {
  //     that.success(data);
  //   },
  //   error: function() {
  //     that.failed(e);
  //   }
  // })
  const mockData = {
    page:{
      num:1,
      size:20,
      total:300
    },
    result:[]
  };

  let _i = 0;
  while(_i<20){
    mockData.result.push({
      doc_id:_.random(0,999999999),
      _raw:'tatus:OK client_ip:85.178.30.13 http.content_length:211 http.phrase:OK http.code:200 http.response_headers.content_type:application/json http.request_headers.host:packetbeat.com timestamp:February 18th 2016, 14:43:15.000 client_port:59,900 query:GET /api/shippers HTTP/1.1 path:/api/shippers server:app.server3',
      _timestamp: +new Date() - (_.random(1,99)*360000),
      http_method:'get',
      http_status:_.random(200,210)
    });
    _i++;
  }

  this.success(mockData);
});


export default SearchAction;
