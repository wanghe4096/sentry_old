import React from 'react';
import _ from 'underscore';
import Highcharts from 'highcharts';
import LineChart from 'components/charts/line';
import AreaChart from 'components/charts/area';
import TimeSeries from 'components/charts/timeSeries';
import Histogram from 'components/charts/histogram';
import PieChart  from 'components/charts/pie';

const Charts = React.createClass({
  propTypes: {
    graphType: React.PropTypes.string.isRequired,
    x_axis: React.PropTypes.array.isRequired,
    y_axis: React.PropTypes.array.isRequired,
    data: React.PropTypes.object.isRequired,
  },
  render() {
    let graphType = this.props.graphType;

    if(this.props.mock) {
      const avalibleGraphs = ['line','area','time series','histogram','pie'];
      graphType = avalibleGraphs[_.random(0, avalibleGraphs.length-1)]
    }

    switch(graphType) {
      case 'line':
        return (<LineChart {...this.props} />)
        break;
      case 'area':
        return (<AreaChart {...this.props} />)
        break;
      case 'time series':
        return (<TimeSeries {...this.props} />)
        break;
      case 'histogram':
        return (<Histogram {...this.props} />)
        break;
      case 'pie':
        return (<PieChart {...this.props} />)
        break;
      default:
        return (<div>undefined graphType</div>)
    }
  }
});

export default Charts;
