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
  new Client().request('/dashboard', {
    success: function(data) {
      that.success(data);
    },
    error: function() {
      that.failed(e);
    }
  })
});

// update item
ListAction.update.listen(function(data) {
  var that = this;
  new Client().request('/dashboard', {
    type: 'POST',
    data: {
      'op': data.id ? 'update': 'create',
      'name': data.name,
      'desc': data.desc,
      'id': data.id
    },
    success: function(data) {
      console.log('update data:',data);
    },
    error: function(e) {
      console.log('update error');
    }
  });
});

export default ListAction;
