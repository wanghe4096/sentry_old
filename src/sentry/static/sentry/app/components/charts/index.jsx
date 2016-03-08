import React from 'react';
import Highcharts from 'highcharts';
import LineChart from 'components/charts/line';
import AreaChart from 'components/charts/area';

const Charts = React.createClass({
  propTypes: {
    graphType: React.PropTypes.string.isRequired,
    x_axis: React.PropTypes.array.isRequired,
    y_axis: React.PropTypes.array.isRequired,
    data: React.PropTypes.object.isRequired,
  },
  render() {
    switch(this.props.graphType) {
      case 'line':
        return (<LineChart {...this.props} />)
        break;
      case 'area':
        return (<AreaChart {...this.props} />)
        break;
      case 'x':
        break;
      default:
        return (<div>undefined graphType</div>)
    }
  }
});

export default Charts;
