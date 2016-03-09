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

  // TODO: mock data
  const mockData = [];
  let _i = 0;
  while(_i < 20) {
    mockData.push({
      stream_id: 'xxxx' + _.random(1,9999),
      stream_name: 'xxx2' + _.random(1,9999),
      stream_type: ['group1','group2','group3'][_.random(0,2)]
    });
    _i++;
  }
  setTimeout(() => {
      this.success(mockData);
  },300);

  // new Client().request('/streams/?host_id=' + hostId, {
  //   success: function (data) {
  //     that.success(data);
  //   },
  //   error: function (e) {
  //     that.failed(e);
  //   }
  // });

});

export default StreamActions;
