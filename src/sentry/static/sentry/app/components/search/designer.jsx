import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import AlertActions from 'actions/alertActions.jsx';
import {t} from 'app/locale';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DesignerStore from 'stores/search/designerStore';
import DesignerStateAction from 'actions/search/designerStateAction';
import AxisTagWrap from 'components/search/axisTagWrap';
import Highcharts from 'highcharts';

const css = require('css/search/component-designer.less');

/**
 *
 */
const Designer = React.createClass({
  mixins: [
    Reflux.connect(DesignerStore)
  ],
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  componentDidMount() {
    Highcharts.chart(this.refs.frame,{
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
    return (
      <div className="designer-body">
        <div className="s2-container">
          <AxisTagWrap />
          <div className="designer-frame">
            <div className="y-axis">
              <span className="vertical-text">Y axis</span>
            </div>
            <div className="x-axis">X axis</div>
            <div className="frame-body" ref="frame">
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Designer;
