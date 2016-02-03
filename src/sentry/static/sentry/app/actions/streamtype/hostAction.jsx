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

  var that = this;
  new Client().request('/hosts/', {
    success: function (data) {
      that.success(data);
    },
    error: function (e) {
      that.failed(e);
    }
  });

});

HostAction.add.listen(function (data) {
  const mockData = {
    desc: '这是对streamtype的描述',
    extract: 'name',
    id: 'id-' + moment().format('YYYY-MM-DD-HH:mm:ss') +'-'+_.random(0,999999),
    host_name: '创建于' + moment().format('YYYY-MM-DD HH:mm:ss') + '的streamtype',
    host_type: 'xxxxx-host_type',
    distver: "3.1.0",
    host_key: "yyyy",
    system: "linux",
    user: 1
  };

  this.success(mockData);
});


export default HostAction;