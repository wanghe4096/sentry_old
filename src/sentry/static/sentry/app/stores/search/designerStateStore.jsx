import Reflux from 'reflux';
import DesignerStateAction from 'actions/search/designerStateAction';

const chartTypes = [
  {
    name:'xxx1',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'xxx2',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'xxx3',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'xxx4',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'xxx5',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'xxx6',
    icon:'xxxx.png',
    group:'Timeseries Graphs'
  },
  {
    name:'xxx7',
    icon:'xxxx.png',
    group:'Timeseries Graphs'
  }
];

const DesignerStateStore = Reflux.createStore({
  listenables:DesignerStateAction,
  data:{
    graphType: chartTypes[0].name,
    x_axis: [],
    y_axis: []
  },
  getInitialState() {
    return this.data;
  },
  init() {
    window.qw = this;
  },
  get(field) {
    return this.data[field]
  },
  getAxis(axis) {
    const stateKey = axis + '_axis';
    return this.data[stateKey];
  },
  getChartTypes() {
    return chartTypes;
  },
  onSetGraphType(type) {
    this.data.graphType = type;
    this.trigger(this.data);
  },
  onSetAxisValue(axis, value) {
    let stateKey = axis + '_axis';
    this.data[stateKey] = value;
    this.trigger(this.data);
  }
});

export default DesignerStateStore;
