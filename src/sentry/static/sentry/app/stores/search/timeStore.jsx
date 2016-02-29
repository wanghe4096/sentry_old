import Reflux from 'reflux';
import _ from 'underscore';
import TimeActions from 'actions/search/timeAction';

const timeStore = Reflux.createStore({
  listenables: TimeActions,
  data: {},
  getInitialState() {
    return {
      mode: 'relative',
      data: {
        value: 1,
        unit: 'd'
      }
    }
    // if absolute
    // return {
    //   type: 'absolute',
    //   data:{
    //     from:1456713791472,
    //     to:1456713891472
    //   }
    // }
  },
  onSet(type,data) {
    this.data.mode = type;
    this.data.data = data;
    this.trigger(this.data);
  }
});

export default timeStore;
