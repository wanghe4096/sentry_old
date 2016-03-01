import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import PropTypes from 'app/proptypes';
import {Link,IndexLink} from 'react-router';
import TimePanel from 'components/search/timePanel';
import OrganizationStore from 'stores/organizationStore';

const SearchHeader = React.createClass({
  contextTypes: {
    organization: PropTypes.Organization
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
            <ul className="dropdown-menu-right dropdown-menu">
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
              <button type="button" className="btn btn-default">Save as</button>
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
        <TimePanel />
      </div>
    )
  }
});

export default SearchHeader;
