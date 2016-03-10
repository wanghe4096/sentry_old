/**
 * Title: streamAction.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import Reflux from 'reflux';
import _ from 'underscore';
import {Client} from './../../api';

const StreamActions = Reflux.createActions({
  fetch: {
    children: ['success', 'failed']
  }
});

StreamActions.fetch.listen(function (hostId) {

  var that = this;

  new Client().request('/streams/?host_id=' + hostId, {
    success: function (data) {
      that.success(data);
    },
    error: function (e) {
      that.failed(e);
    }
  });

});

export default StreamActions;
