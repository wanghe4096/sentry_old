/**
 * Title: hostAction.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import Reflux from 'reflux';
import moment from 'moment';
import _ from 'underscore';
import {Client} from './../../api';

const HostAction = Reflux.createActions({
  fetch: {
    children: ["success", "failed"]
  },
  add: {
    children: ["success", "failed"]
  }
});

HostAction.fetch.listen(function () {

  // TODO: mock data
  const mockData = [];
  let _i = 0;
  while(_i < 10) {
    mockData.push({
      host_id: 'xxxx' + _.random(1,9999),
      host_name: 'xxx2' + _.random(1,9999),
      host_group: ['group1','group2','group3'][_.random(0,2)]
    });
    _i++;
  }
  setTimeout(() => {
      this.success(mockData);
  },300);

  // var that = this;
  // new Client().request('/hosts/', {
  //   success: function (data) {
  //     that.success(data);
  //   },
  //   error: function (e) {
  //     that.failed(e);
  //   }
  // });

});

export default HostAction;
