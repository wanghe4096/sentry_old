import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

const SearchQuery = React.createClass({
  render() {
    return (
      <div className="search-query">
        <div className="query-l">
          <h5>Query:</h5>
        </div>
        <div className="query-r">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="please enter query" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
});

export default SearchQuery;
