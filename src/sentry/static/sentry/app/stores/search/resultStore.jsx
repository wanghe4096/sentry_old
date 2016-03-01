import Reflux from 'reflux';
import _ from 'underscore';
import SearchAction from 'actions/search/searchAction';

const ResultStore = Reflux.createStore({
  listenables: SearchAction,
  result: [],
  page:{},
  getInitialState() {
    return this.result
  },
  onFetch() {
    // on fetch status
  },
  onFetchSuccess(data) {
    this.result = data.result;
    this.page = data.page;
    this.trigger(this.result);
  },
  onFetchFailed(e) {
    console.log('result result fetch err');
  }
});

export default ResultStore;
