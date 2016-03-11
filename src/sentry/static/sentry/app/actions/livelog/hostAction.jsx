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

export default HostAction;
