import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import {Link,IndexLink} from 'react-router';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import DocumentTitle from 'react-document-title';
import ReactGridLayout from 'react-grid-layout';

const WidthProvider = ReactGridLayout.WidthProvider;
const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout.Responsive);

const SearchVisualIndex = React.createClass({
  mixins: [PureRenderMixin],
  getDefaultProps() {
    return {
      autoSize: false,
      draggableHandle: '.panel-heading',
      useCSSTransforms: true,
      rowHeight: 30,
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };
  },
  getInitialState() {
    return {
      layouts: {
        lg:[
          { "x": 0, "y": 0, "w": 5, "h": 10, "i": "0" },
          { "x": 0, "y": 6, "w": 4, "h": 9, "i": "1" },
          { "x": 5, "y": 0, "w": 4, "h": 10, "i": "2" },
          { "x": 4, "y": 6, "w": 4, "h": 9, "i": "3" },
          { "x": 9, "y": 0, "w": 3, "h": 10, "i": "4" },
          { "x": 8, "y": 6, "w": 4, "h": 9, "i": "5" },
          { "x": 0, "y": 15, "w": 3, "h": 12, "i": "6" },
          { "x": 3, "y": 20, "w": 3, "h": 12, "i": "7" },
          { "x": 6, "y": 15, "w": 6, "h": 12, "i": "8" }
        ]
      },
      currentBreakpoint: 'lg'
    };
  },
  addWidgetHandler() {
    console.log('add widget');
  },

  onBreakpointChange(breakpoint) {
    console.log(breakpoint);
    this.setState({currentBreakpoint: breakpoint});
  },

  onLayoutChange(layout) {
    // console.log('layout on change:', JSON.stringify(layout));
    // this.props.onLayoutChange(layout);
  },

  addNewHander() {
    console.log('new')
  },

  renderBody(){
    return _.map(this.state.layouts.lg, (l, i) => {
      const designerUrl = `/${this.props.params.orgId}/search/vs/w000000${i}/`;
      return (
        <div key={i} className="panel panel-default">
          <div className="panel-heading">
            <span className="panel-title">Panel
              {i}</span>
            <div className="btn-group pull-right">
              <Link to={designerUrl}
                className="h-btn">
                <i aria-hidden="true" className="fa fa-pencil"></i>
              </Link>
              <div className="btn-group h-btn pull-right">
                <i className="fa fa-times"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"></i>
                  <ul className="dropdown-menu">
                    <li><label>confirm?</label></li>
                    <li><a href="#">yes</a></li>
                    <li><a href="#">cancel</a></li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="panel-body">
            Panel content /
            {i}
          </div>
        </div>
      );
    });
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
              onLayoutChange={this.onLayoutChange} {...this.props}>
              { this.renderBody() }
            </ResponsiveReactGridLayout>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default SearchVisualIndex;
