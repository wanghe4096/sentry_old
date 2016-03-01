import Reflux from 'reflux';
import ListAction from 'actions/dashboard/listAction';
import _ from 'underscore';

const listStore = Reflux.createStore({
  listenables: ListAction,
  items:[],
  getInitialState() {
    return []
  },
  onFetchSuccess(items) {
    console.log('items:',items);
    this.items = items;
    this.trigger(this.items);
  },
  onFetchFailed(e) {
    console.error('fetch err:', e);
  }
});

export default listStore;
