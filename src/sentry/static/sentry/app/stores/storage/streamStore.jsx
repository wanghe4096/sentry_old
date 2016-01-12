/**
 * Title: streamStore.jsx
 * Author: bold
 * Date: 1/11/16.
 * Description: 。
 */

import Reflux from 'reflux';

import StreamActions from 'actions/storage/streamAction.jsx';

const StreamStore = Reflux.createStore({
  listenables: StreamActions,
  init() {
    this.items = [];
  },
  get(){

  },
  getAll() {

  },
  onFetch(hostId) {
    const that = this;
    $.ajax({
      url:'xxxx'
    }).done((data)=>{
      //StreamActions.update.completed(data);
      that.triggerPromise(data);

    }).fail(()=>{
      StreamActions.update.failed();
    });
  },
  onUpdate() {

  },
  load(items){
    this.items = items;
    this.trigger(items);
  }
});


export default StreamStore;