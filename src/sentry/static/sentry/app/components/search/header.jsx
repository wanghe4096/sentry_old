import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import PropTypes from 'app/proptypes';
import {Link,IndexLink} from 'react-router';

import OrganizationStore from 'stores/organizationStore';

const SearchHeader = React.createClass({
  contextTypes: {
    organization: PropTypes.Organization
  },
  handlerView() {
    // visual
  },
  render() {
    let org = this.context.organization;
    return (
      <div className="search-header">
        <h4 className="app-tit">{t('Search')}</h4>
        <div className="save-panel">
          <div className="saved-list btn-group btn-group-sm dropdown">
            <a type="button" className="btn btn-default">
              default search
              <span className="status">edited*</span>
            </a>
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#">Search xxx</a></li>
              <li><a href="#">Search xxx</a></li>
              <li><a href="#">Search xxx</a></li>
              <li><a href="#">Search xxx</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">New Search</a></li>
            </ul>
          </div>
          <div className="save-ctrl">
            <div className="btn-group btn-group-sm">
              <button type="button" className="btn btn-default">Save</button>
              <button type="button" className="btn btn-default">New</button>
            </div>
          </div>
        </div>
        <div className="tab-nav btn-group btn-group-sm">
          <IndexLink
            className="btn btn-default"
            activeClassName="nav-active"
            to={`/${org.slug}/search/`}>Result</IndexLink>
          <Link
            className="btn btn-default"
            activeClassName="nav-active"
            to={`/${org.slug}/search/vs/`}>Visualization</Link>
        </div>
        <div className="time-panel clearfix">
          <button className="btn-refresh btn btn-sm btn-default">
            <span className="glyphicon glyphicon-repeat"></span>
            <span> Auto Refresh</span>
          </button>
          <div className="time-range">
            <span className="selector">2015-12-2 05:12:12</span>
            <span>To</span>
            <span className="selector">2015-12-3 06:03:01</span>
          </div>
        </div>
      </div>
    )
  }
});

export default SearchHeader;
