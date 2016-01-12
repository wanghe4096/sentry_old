/**
 * Title: hostManageStatusStore.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */


import Reflux from 'reflux';
import hostManageStatusActions from '../../actions/storage/hostManageStatusAction';

const hostManageStatusStore = Reflux.createStore({
  listenables:hostManageStatusActions,
  init(){

  },
  status:{
    activeHost:null,
    activeStream:null
  },
  onSetActiveHost(hostId){
    this.status.activeHost = hostId;
    this.status.activeStream = null;
    this.trigger(this.status);
  },
  onSetActiveStream(streamId){
    this.status.activeStream= streamId;
    this.trigger(this.status);
  },
  getStatus(){
    return this.status;
  }
});

export default hostManageStatusStore;