import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import SearchStore from 'stores/search/searchStore';
import QueryAction from 'actions/search/queryAction';

// NOTE: query无需维护store，在组件内用state维护即可。
//       searchStore内只存已搜索的query，不保存临时的query

const SearchQuery = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
  },

  getInitialState() {
    return {
      query: SearchStore.get('query')
    }
  },

  onChangeHandler(e) {
    this.setState({
      query:e.target.value
    })
  },

  onSubmitHandler(e) {
    e.preventDefault();
    QueryAction.set(this.state.query); // sync to searchStore

    this.props.onSubmit && this.props.onSubmit(this.state.query); // DEPRECATED
  },
  
  render() {
    return (
      <div className="search-query">
        <div className="query-l">
          <h5 className="s-tit">Query:</h5>
        </div>
        <div className="query-r">
          <form onSubmit={this.onSubmitHandler}>
            <div className="input-group">
                <input type="text"
                  className="form-control"
                  placeholder="please enter query"
                  onChange={ this.onChangeHandler }
                  value={this.state.query} />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">Go!</button>
                </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

export default SearchQuery;
