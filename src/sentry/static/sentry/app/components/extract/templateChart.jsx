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
import {t} from 'app/locale';
import LoadingIndicator from 'components/loadingIndicator';
import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore'
import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';

const TemplateChart = React.createClass({
  mixins: [
    Reflux.listenTo(ExtractorStatus, 'onStatusChange'),
    Reflux.connect(ExtractorTemplateStore, 'data') // todo:需要考虑加载失败的情况,最好给个提示
  ],

  getInitialState() {
    return {
      isRuning: false, // running 与 loading 是两个概念!!
      data: []
    }
  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning
    });
  },

  getOption() {

    const values = this.state.data.map((template, i) => {
      return {
        value: template.events.length,
        name: 'Role ' + (i+1)
      }
    });

    let option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '规则匹配数',
          type: 'pie',
          //selectedMode: 'single',
          radius: '55%',
          center: ['50%', '60%'],
          data: values,
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

  bindChartEvt() {
    this.chart && this.chart.on('mouseover', function (e) {

      // todo: 凑合的实现方式
      if (window.xxEditor && window.xxEditor.codemirror) {
        window.xxEditor.codemirror.setCursor(e.dataIndex);
      }
    })
  },

  componentDidUpdate() {

    if (!this.chart) {
      this.chart = this.initChart();
    }
    this.chart && this.chart.setOption(this.getOption());
    this.chart && this.bindChartEvt();
  },

  componentDidMount() {
    this.chart = this.initChart();
    this.chart && this.chart.setOption(this.getOption());
    this.chart && this.bindChartEvt();
  },

  initChart() {
    if (this.state.data.length && !this.echarts) {
      window.zzz = echarts.init(this.refs.wrap);
      return window.zzz;
    } else {
      return this.echarts;
    }
  },

  render() {
    window.ss = this;
    if (this.state.isRuning) {
      return (
        <div className="running-stat-box">
          <LoadingIndicator />
        </div>
      )
    }

    if (!this.state.data.length) {
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"/>
          <p>{t('Sorry, not found.')}</p>
        </div>
      )
    }

    return (
      <div ref="wrap" className="chart-wrap"/>
    )
  }
});

export default TemplateChart;