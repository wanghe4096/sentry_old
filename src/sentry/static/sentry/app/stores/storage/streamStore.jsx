/**
 * Title: streamStore.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import Reflux from 'reflux';
import StreamActions from 'actions/storage/streamAction';
import _ from 'underscore';

const StreamStore = Reflux.createStore({
  listenables: StreamActions,

  items: [],

  init() {

  },

  getById(streamId) {
    return _.find(this.items, (stream) => stream.stream_id === streamId);
  },

  getAll() {
    return this.items;
  },

  onFetchSuccess(items) {
    this.items = items;
    this.trigger(this.items);
  },

  onFetchFailed(e) {
    console.log('fetch err:', e);
  }
});


export default StreamStore;