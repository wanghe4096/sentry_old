import React from 'react';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';

import SearchHeader from 'components/search/header';
import SearchQuery from 'components/search/query';

const css = require('css/search.less');

const searchApp = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  render() {
    return (
      <DocumentTitle title="search">
        <div className="sub-app sa-search">
          <SearchHeader/>
          <SearchQuery />
          {this.props.children}
        </div>
      </DocumentTitle>
    )
  }
});

export default searchApp;
