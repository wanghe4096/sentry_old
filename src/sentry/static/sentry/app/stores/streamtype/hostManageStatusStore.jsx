/**
 * Title: hostManageStatusStore.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */


import Reflux from 'reflux';
import hostManageStatusActions from '../../actions/streamtype/hostManageStatusAction';

const hostManageStatusStore = Reflux.createStore({
  listenables: hostManageStatusActions,

  init(){

  },

  previousStatus: {},

  status: {
    activeHost: null,
    activeStream: null
  },

  getPrevious() {
    return this.previousStatus;
  },

  hasChanged(attr) {
    return this.previousStatus[attr] !== this.status[attr];
  },

  onSetActiveHost(hostId) {
    Object.assign(this.previousStatus, this.status);
    this.status.activeHost = hostId;
    this.status.activeStream = null;
    this.trigger(this.status);
  },

  onSetActiveStream(streamId) {
    Object.assign(this.previousStatus, this.status);
    this.status.activeStream = streamId;
    this.trigger(this.status);
  },

  getStatus() {
    return this.status;
  }
});

export default hostManageStatusStore;