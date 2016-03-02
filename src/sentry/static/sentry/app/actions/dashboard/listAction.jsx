import Reflux from 'reflux';
import {Client} from './../../api';

const ListAction = Reflux.createActions({
  fetch: {
    children:['success','failed']
  },
  update: {
    children:['success','failed']
  }
});

// fetch list
ListAction.fetch.listen(function() {
  var that = this;
  new Client().request('/dashboard/', {
    success: function(data) {
      that.success(data);
    },
    error: function(e) {
      that.failed(e);
    }
  })
});

// update item
ListAction.update.listen(function(data) {
  // console.log('1111111:data.id', data.id, data.id ? 'PUT': 'POST');
  var that = this;
  return new Client().request('/dashboard/', {
    method: data.id ? 'PUT': 'POST',
    data: data,
    success: function(data) {
      console.log('update data:',data);
    },
    error: function(e) {
      console.log('update error');
    }
  });
});

export default ListAction;
