/**
 * Title: hostAction.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import Reflux from 'reflux';
import moment from 'moment';
import _ from 'underscore';

const HostAction = Reflux.createActions({
  fetch: {
    children: ["success", "failed"]
  },
  add: {
    children: ["success", "failed"]
  }
});


HostAction.fetch.listen(function () {
  //new Client().request('/storage/host/', {
  //  success: function (data) {
  //    this.completed(data);
  //  },
  //  error: function (e) {
  //    this.failed(e);
  //  }
  //});

  const mockData = [
    {
      host_id: 'xxxx-1-id',
      host_name: 'xxxx-1',
      host_type: 'xxxx-1-hostType'
    },
    {
      host_id: 'xxxx-2-id',
      host_name: 'xxxx-2',
      host_type: 'xxxx-2-hostType'
    },
    {
      host_id: 'xxxx-3-id',
      host_name: 'xxxx-3',
      host_type: 'xxxx-3-hostType'
    },
    {
      host_id: 'xxxx-4-id',
      host_name: 'xxxx-4',
      host_type: 'xxxx-4-hostType'
    }
  ];

  this.success(mockData);
});


HostAction.add.listen(function (data) {
  const mockData = {
    host_id: 'id-' + moment().format('YYYY-MM-DD-HH:mm:ss'),
    host_name: '创建于' + moment().format('YYYY-MM-DD HH:mm:ss') + '的临时host',
    host_type: 'xxxxx-host_type'
  };

  console.log('新增host:',data);

  this.success(mockData);
});


export default HostAction;