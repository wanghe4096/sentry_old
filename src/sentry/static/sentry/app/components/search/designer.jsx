import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import AlertActions from 'actions/alertActions.jsx';
import {t} from 'app/locale';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DesignerStore from 'stores/search/designerStore';
import DesignerStateAction from 'actions/search/designerStateAction';
import AxisTagWrap from 'components/search/axisTagWrap';
import Charts from 'components/charts';

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
  render() {
    const data = {

    };

    return (
      <div className="designer-body">
        <div className="s2-container">
          <AxisTagWrap />
          <div className="designer-frame">
            <div className="y-axis">
              <span className="vertical-text">Y axis</span>
            </div>
            <div className="x-axis">X axis</div>
            <div className="frame-body">
              <Charts
                graphType = {this.state.graphType}
                x_axis = {this.state.x_axis}
                y_axis = {this.state.y_axis}
                data = {data} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Designer;
