import Reflux from 'reflux';
import HostAction from 'actions/livelog/hostAction';
import _ from 'underscore';

const HostStore = Reflux.createStore({
  listenables: HostAction,

  items: [],

  status: {
    fetching: false
    // fetched:false,
    // latestUpate:new Date()
  },

  getInitialState() {
    return this.items;
  },

  init() {

  },

  getById(hostId) {
    return _.find(this.items, (item) => hostId === item.id);
  },

  getAll() {
    return this.items;
  },

  onFetch() {
    this.status.fetching = true;
  },

  onFetchSuccess(items) {
    this.status.fetching = false;
    this.items = items;
    this.trigger(this.items);
  },

  onFetchError(e) {
    this.status.fetching = false;
    console.error('fetch err:', e);
  }
});


export default HostStore;
