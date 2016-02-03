import Reflux from 'reflux';
import HostAction from 'actions/streamtype/hostAction';
import _ from 'underscore';

const HostStore = Reflux.createStore({
  listenables: HostAction,

  items: [
    {
      desc: '这是对streamtype的描述',
      extract: 'name',
      id: 'id-' + moment().format('YYYY-MM-DD-HH:mm:ss') + '-' + _.random(0, 999999),
      host_name: '创建于' + moment().format('YYYY-MM-DD HH:mm:ss') + '的streamtype',
      host_type: 'xxxxx-host_type',
      distver: "3.1.0",
      host_key: "yyyy",
      system: "linux",
      user: 1
    },
    {
      desc: '这是对streamtype的描述',
      extract: 'name',
      id: 'id-' + moment().format('YYYY-MM-DD-HH:mm:ss') + '-' + _.random(0, 999999),
      host_name: '创建于' + moment().format('YYYY-MM-DD HH:mm:ss') + '的streamtype',
      host_type: 'xxxxx-host_type',
      distver: "3.1.0",
      host_key: "yyyy",
      system: "linux",
      user: 1
    }
  ],

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