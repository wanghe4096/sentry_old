/**
 * Title: templateChart.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import echarts from 'echarts';
import _ from 'underscore';

import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore'

const TemplateChart = React.createClass({
  mixins: [
    Reflux.connect(ExtractorTemplateStore, 'data') // todo:需要考虑加载失败的情况,最好给个提示
  ],

  getInitialState() {
    return {
      data: []
    }
  },

  getOption() {
    window.xxx = this.state.data;

    let option = {
      toolbox: {
        show: false
      },
      grid: {
        y2: 80
      },
      xAxis: [
        {
          type: 'category',
          data: this.state.data.map(() => { return "template 1" })
        }
      ],
      yAxis: [
        {
          name: 'events',
          type: 'value',
          axisLabel : {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name:'蒸发量',
          type:'bar',
          data:this.state.data.map((template) => { return template.events.length })
        }
      ]
    };

    // todo:将 this.state.data 转换到上面

    return option;
  },

  componentWillMount() {

  },

  componentDidUpdate() {

    this.chart.setOption(this.getOption());

  },

  componentDidMount() {

    this.chart = echarts.init(this.refs.wrap);

    // 使用刚指定的配置项和数据显示图表。
    this.chart.setOption(this.getOption());
  },

  render() {
    return (
      <div ref="wrap" className="chart-wrap">
      </div>
    )
  }
});

export default TemplateChart;