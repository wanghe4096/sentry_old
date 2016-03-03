import Reflux from 'reflux';
import {Client} from './../../api';
import _ from 'underscore';

const FieldAction = Reflux.createActions({
  fetch: {
    children:['success','failed']
  }
});

FieldAction.fetch.listen(function(query,timeRange,options = {}) {
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
  let mockData = [];
  let mockNameList = ["appName", "auth", "bytes", "class", "client_ip", "Host", "http_version", "ident", "log_timestamp", "logLevel", "logMessage", "nodeName", "rawrequest", "request", "response", "Source", "Source Type", "threadName", "tierName", "verb"];
  let _i = 0;
  while( _i< 20 ) {
    mockData.push({
      name:mockNameList[_i],
      // field_key:'xxxxx',
      // counts:[],
      field_type:['string','number'][_.random(0,1)],
      default_selected:!!_.random(0,1)
    });
    _i++;
  }

  this.success(mockData);
})

export default FieldAction;
