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
  let _i = 0;
  while( _i< 13 ) {
    mockData.push({
      name:'xxxx'+_.random(3,30),
      field_key:'xxxxx',
      counts:[],
      default_selected:!!_.random(0,1),
      group:{}
    });
    _i++;
  }

  this.success(mockData);
})

export default FieldAction;
