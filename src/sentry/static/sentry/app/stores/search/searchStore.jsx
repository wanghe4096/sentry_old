import Reflux from 'reflux';
import QueryActions from 'actions/search/queryAction';
import TimeActions from 'actions/search/timeAction';
import TimeStore from 'stores/search/timeStore';

const SearchStore = Reflux.createStore({
  obj: {
    query: 'search : (aaa & bbb) or (cc)   filter: http_methd >=get  groupby: client sort:timestamp',
    timeRange: TimeStore.data
  },

  init() {
    // this.obj.timeRange
    this.listenTo(QueryActions.set, this.onSetQuery);
    this.listenTo(TimeActions.set, this.onSetTime)
  },

  get(key) {
    return this.obj[key]
  },

  onSetQuery(query) {
    this.obj.query = query;
    this.trigger(this.obj);
  },

  onSetTime(mode,data) {
    this.obj.timeRange = {mode,data};
    this.trigger(this.obj);
  }
});

export default SearchStore;
