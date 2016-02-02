/**
 * Title: streamChartAction.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import Reflux from 'reflux';
import _ from 'underscore';

const StreamChartActions = Reflux.createActions({
  fetch: {
    children: ['success', 'failed']
  }
});

StreamChartActions.fetch.listen(function (streamId) {

  // todo: this is mock data
  let data = [];
  let len = 0;
  while (len++ < 30) {
    data.push([
      new Date(2014, 9, 1, 0, len * 10000),
      _.random(0, 30),
      _.random(0, 100)
    ]);
  }

  this.success(data);

});

export default StreamChartActions;