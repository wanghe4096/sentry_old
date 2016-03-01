import Reflux from 'reflux';
import _ from 'underscore';
import FieldAction from 'actions/search/fieldAction';

const FieldStore = Reflux.createStore({
  listenables: FieldAction,
  items: [],
  getInitialState() {
    return this.items
  },
  onFetch() {
    // on fetch status
  },
  onFetchSuccess(data) {
    this.items = data;
    this.trigger(this.items);
  },
  onFetchFailed(e) {
    console.log('fetch field err:',e)
  }
});

export default FieldStore;
