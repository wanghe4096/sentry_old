import Reflux from 'reflux';
import _ from 'underscore';
import TimeActions from 'actions/search/timeAction';

// DEPRECATED ???
// NOTE 是否移除目前没影响，单独存储可能更灵活些

const timeStore = Reflux.createStore({
  listenables: TimeActions,
  data: {
    mode: 'relative',
    data: {
      value: 1,
      unit: 'd'
    }
  },
  // if absolute
  // return {
  //   type: 'absolute',
  //   data:{
  //     from:1456713791472,
  //     to:1456713891472
  //   }
  // }
  getInitialState() {
    return this.data
  },
  onSet(type,data) {
    this.data.mode = type;
    this.data.data = data;
    this.trigger(this.data);
  }
});

export default timeStore;
