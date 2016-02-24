import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import FieldList from 'components/search/dragFieldList';
import {Link,IndexLink} from 'react-router';
import Designer from 'components/search/designer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {t} from 'app/locale';

const css = require('css/search/designer.less');

// this.props.params.widgetId
const SearchVisualDesigner = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  render() {
    const widgetId = this.props.params.widgetId;
    const locationState = this.props.location.state || {}
    const backToObj = locationState.backTo || {};
    const backUrl = backToObj.url || `/${this.props.params.orgId}/search/vs/`;
    const backTitle = backToObj.title || t('Back to List');
    // console.log('state:',this.props.location.state)
    return (
      <DocumentTitle title="Search Result">
        <div className="widget-design-wrap">
          <div className="designer-header">
            <Link
              className="back-btn btn btn-sm btn-primary"
              to={backUrl} >
              <i className="glyphicon glyphicon-chevron-left" />
              <span>{backTitle}</span>
            </Link>
            <span className="designer-tit">Widget Design</span>
          </div>
          <div className="designer-container">
            <div className="s-container">
              <FieldList />
              <Designer />
              <section className="type-selector">
                <div className="section-head">
                  <span className="tit">Graphs Selector</span>
                </div>
                <div className="t-group">
                  <p className="group-tit">Visualize</p>
                  <ul className="t-list-ul clearfix">
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                  </ul>
                </div>
                <div className="t-group">
                  <p className="group-tit">Timeseries Graphs</p>
                  <ul className="t-list-ul clearfix">
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                    <li className="t-item-li">
                      <i className="glyphicon glyphicon-align-left" />
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default DragDropContext(HTML5Backend)(SearchVisualDesigner);
