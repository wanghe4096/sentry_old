import React from 'react';
import Highcharts from 'highcharts';

const LineChart = React.createClass({
  componentDidMount() {
    Highcharts.chart(this.refs.container,{
      title: null,
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
          title: {
              text: 'Values'
          }
      },
      tooltip: {
          valueSuffix: '°C'
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
      },
      series: [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }]
    })
  },
  render() {
    return (<div className="chart-container" ref="container"> </div>)
  }
});

export default LineChart;
