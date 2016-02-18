import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';

import ReactGridLayout from 'react-grid-layout';

const WidthProvider = ReactGridLayout.WidthProvider;
const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout.Responsive);

const SearchVisual = React.createClass({
  mixins: [PureRenderMixin],
  getDefaultProps() {
    return {
      rowHeight: 30,
      cols: {
        lg: 12,
        md: 10,
        sm: 6,
        xs: 4,
        xxs: 2
      }
    };
  },
  getInitialState() {
    return {
      layouts: {
        lg: this.generateLayout()
      },
      currentBreakpoint: 'lg'
    };
  },
  addWidgetHandler() {
    console.log('add widget');
  },

  generateLayout() {
    // var p = this.props;
    // return _.map(_.range(0, 25), function(item, i) {
    //   var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
    //   return {
    //     x: _.random(0, 5) * 2 % 12,
    //     y: Math.floor(i / 6) * y,
    //     w: 2,
    //     h: y,
    //     i: i.toString(),
    //     static: false
    //   };
    // });
    var p = this.props;
    const x = _.map(new Array(10), function(item, i) {
      var minW = _.random(4, 6), minH = _.random(3, 6);
      var maxW = _.random(minW, 6), maxH = _.random(minH, 6);
      var w = _.random(minW, maxW);
      var y = _.random(minH, maxH);
      return {
        x: i * 2 % 12, y: Math.floor(i / 6) * y, w: w, h: y, i: i.toString(),
        minW: minW, maxW: maxW, minH: minH, maxH: maxH
      };
    });
    console.log(x);
    return x;
  },

  onBreakpointChange(breakpoint) {
    this.setState({currentBreakpoint: breakpoint});
  },

  onLayoutChange(layout) {
    console.log('layout on change:', layout);
    // this.props.onLayoutChange(layout);
  },

  addNewHander() {
    console.log('new')
  },
  render() {
    return (
      <DocumentTitle title="Search Visualization">
        <div className="search-visual-tab">
          <div className="search-visual-head">
            <span className="add-widget-btn" onClick={this.addNewHander}>
              <i className="glyphicon glyphicon-unchecked"/>
              +Add Widget
            </span>
          </div>
          <div className="search-visual-body">
            <ResponsiveReactGridLayout
              layouts={this.state.layouts}
              onBreakpointChange={this.onBreakpointChange}
              onLayoutChange={this.onLayoutChange}
              useCSSTransforms={true}
              {...this.props}>
                {
                  _.map(this.state.layouts.lg, function(l, i) {
                    var mins = [l.minW, l.minH], maxes = [l.maxW, l.maxH];
                    return (
                      <div key={i}>
                        <span className="text">{i}/{'min:' + mins + ' - max:' + maxes} </span>
                      </div>
                    );
                  })
              }
            </ResponsiveReactGridLayout>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default SearchVisual;
