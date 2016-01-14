import Reflux from 'reflux';
import HostAction from 'actions/storage/hostAction';
import _ from 'underscore';

const HostStore = Reflux.createStore({
  listenables: HostAction,

  items: [],

  init() {

  },

  getById(hostId) {
    return _.find(this.items, (item) => hostId === item.id);
  },

  getAll() {
    return this.items;
  },

  onAddSuccess(item) {
    this.items.unshift(item);
    this.trigger(this.items)
  },

  onAddError(e) {
    console.error('onAddSuccess fail:', e);
  },

  onFetchSuccess(items) {
    this.items = items;
    this.trigger(this.items);
  },

  onFetchError(e) {
    console.error('fetch err:', e)
  }
});


export default HostStore;