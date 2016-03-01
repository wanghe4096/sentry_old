import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import TimeStore from 'stores/search/timeStore';
import SearchHeader from 'components/search/header';
import SearchQuery from 'components/search/query';

const css = require('css/search.less');

const searchApp = React.createClass({
  mixins: [Reflux.connect(TimeStore, 'timerange')],
  getInitialState() {
    return {}
  },

  componentWillMount() {
    css.use();
  },

  componentWillUnmount() {
    css.unuse();
  },

  // DEPRECATED
  onSearchHandler(query) {},

  render() {
    return (
      <DocumentTitle title="search">
        <div className="sub-app sa-search">
          <SearchHeader/>
          <SearchQuery onSubmit={this.onSearchHandler}/>
          {this.props.children}
        </div>
      </DocumentTitle>
    )
  }
});

export default searchApp;
