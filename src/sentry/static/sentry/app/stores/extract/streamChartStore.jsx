/**
 * Title: streamChartStore.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import Reflux from 'reflux';
import StreamChartActions from 'actions/extract/streamChartActions';
import _ from 'underscore';

const StreamChartStore = Reflux.createStore({
  listenables: StreamChartActions,

  data: [],

  init() {

  },

  onFetchSuccess(data) {
    this.data = data;
    this.trigger(this.data);
  },

  onFetchFailed(e) {
    console.log('fetch err:', e);
  }
});

export default StreamChartStore;