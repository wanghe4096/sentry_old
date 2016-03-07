import Reflux from 'reflux';
import DesignerStateAction from 'actions/search/designerStateAction';

const chartTypes = [
  {
    name:'line',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'bar',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'pie',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'area',
    icon:'xxxx.png',
    group:'Visualize'
  },
  {
    name:'histogram',
    icon:'xxxx.png',
    group:'Timeseries Graphs'
  }
];

const DesignerStore = Reflux.createStore({
  listenables:DesignerStateAction,
  data:{
    // graphType: chartTypes[0].name,
    graphType: 'area',
    x_axis: [],
    y_axis: []
  },
  getInitialState() {
    return this.data;
  },
  get(field) {
    return this.data[field];
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

export default DesignerStore;
