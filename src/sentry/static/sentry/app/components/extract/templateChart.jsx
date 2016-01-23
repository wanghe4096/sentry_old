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
    let option = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
        {
          name: '规则匹配数',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'template 1'},
            {value:310, name:'template 2'},
            {value:234, name:'template 3'},
            {value:135, name:'template 4'},
            {value:1548, name:'template 5'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
      <div ref="wrap" className="chart-wrap"></div>
    )
  }
});

export default TemplateChart;