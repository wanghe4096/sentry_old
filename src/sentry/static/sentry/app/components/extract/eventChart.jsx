/**
 * Title: eventChart.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import echarts from 'echarts';
import _ from 'underscore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import StreamChartActions from 'actions/extract/streamChartActions';

import StreamChartStore from 'stores/extract/streamChartStore';

const EventChart = React.createClass({
  mixins: [
    Reflux.connect(StreamChartStore, 'data') // todo:需要考虑加载失败的情况,最好给个提示
  ],

  getInitialState() {
    return {
      data: []
    }
  },

  getOption() {
    return {

      toolbox: {
        show: false
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          zoomLock: true,
          start: 70
        }
      ],
      grid: {
        y2: 80
      },
      xAxis: [
        {
          type: 'time',
          splitNumber: 10

        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      throttle: 300, // 节流阀
      series: [
        {
          name: 'series1',
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: {}
          },
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          data: this.state.data
        }
      ]
    };
  },

  componentWillMount() {
    StreamChartActions.fetch(this.props.streamId);
  },

  componentDidUpdate() {
    this.chart.setOption(this.getOption());
  },

  componentDidMount() {

    this.chart = echarts.init(this.refs.wrap);

    // 使用刚指定的配置项和数据显示图表。
    this.chart.setOption(this.getOption());
    this.chart.on('dataZoom', this.dataZoom);
  },
  dataZoom(param){

    ExtractorStatusActions.setTimeRange(param.start, param.end);

  },
  render() {
    return (
      <div ref="wrap" className="chart-wrap">
      </div>
    )
  }
});

export default EventChart;