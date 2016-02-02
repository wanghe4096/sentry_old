/**
 * Title: extractorState.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import Reflux from 'reflux';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import ExtractorActions from 'actions/extract/extractorActions';

const ExtractStatusStore = Reflux.createStore({
  listenables: [ExtractorStatusActions, ExtractorActions],

  previousStatus: {},

  status: {
    time: {
      startAt: null,
      endAt: null
    },
    isRuned: false,
    isRuning: false, // running 与 loading 是两个概念!!
  },

  hasChanged(attr) {
    return this.previousStatus[attr] !== this.status[attr];
  },

  init() {
    //Reflux.listenTo(ExtractorActions.run,'onRunSuccess');
  },

  onRunSuccess() {
    this.status.isRuned = true;
    this.status.isRuning = false;
    this.trigger(this.status);
  },

  onRunFailed() {
    this.status.isRuned = false;
    this.status.isRuning = false;
  },

  onSetTimeRange(startAt, endAt) {
    Object.assign(this.previousStatus, this.status);
    this.status.time = {startAt, endAt};
    this.status.isRuned = false;
    this.trigger(this.status);
  },

  onSetRunedStatus(stat) {
    stat = typeof stat == "undefined" ? true : stat;
    this.status.isRuned = stat;
    this.trigger(this.status);
  },

  onSetRuningStatus(stat) {
    stat = typeof stat == "undefined" ? true : stat;
    this.status.isRuning = stat;
    this.trigger(this.status);
  }

});

export default ExtractStatusStore;