/**
 * Title: extractorState.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import Reflux from 'reflux';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';

const ExtractStatusStore = Reflux.createStore({
  listenables: ExtractorStatusActions,

  previousStatus: {},

  status: {
    time: {
      startAt: null,
      endAt: null
    }
  },

  hasChanged(attr) {
    return this.previousStatus[attr] !== this.status[attr];
  },

  init() {

  },

  onSetTimeRange(startAt, endAt) {
    Object.assign(this.previousStatus, this.status);
    this.status.time = {startAt, endAt};
    this.trigger(this.status);
  }
});

export default ExtractStatusStore;