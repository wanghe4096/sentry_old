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

    window.xxx = this.state.data;

    const values = this.state.data.map((x) => {
      return x[1]
    });
    const xNames = this.state.data.map((x, i) => {
      return "T" + i
    });

    return {

      toolbox: {
        show: false
      },
      dataZoom: [
        {
          type: 'inside',
          show: true,
          zoomLock: true
        }
      ],
      grid: {
        left: '15%',
        right: '15%',
        bottom: '10%',
        top:'10%'
      },
      xAxis: [
        {
          type: 'category',
          data: xNames
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: 'series1',
          type: 'bar',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#ccc'
            }
          },
          data: values
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