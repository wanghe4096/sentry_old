import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import {Link,IndexLink} from 'react-router';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import DocumentTitle from 'react-document-title';
import ReactGridLayout from 'react-grid-layout';
import DetailHeader from 'components/dashboard/detailHeader';

const WidthProvider = ReactGridLayout.WidthProvider;
const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout.Responsive);
const css = require('css/dashboard.less');

const DashboardDetail = React.createClass({
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
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
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
              {i}
              <Link to={designerUrl}
                className="h-btn">
                <i aria-hidden="true" className="fa fa-pencil"></i>
              </Link>
            </span>
            <div className="more-btn btn-group pull-right">
              <i className="glyphicon glyphicon-option-horizontal"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" />
                <ul className="dropdown-menu-right dropdown-menu">
                  <li><Link to={designerUrl}>Edit</Link></li>
                  <li><a href="#">Delete</a></li>
                </ul>
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
    const orgId = this.props.params.orgId;

    return (
      <DocumentTitle title="dashboard">
        <div className="sub-app sa-dashboard">
          <DetailHeader orgId={orgId} />
          <div className="dashboard-body">
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

export default DashboardDetail;
