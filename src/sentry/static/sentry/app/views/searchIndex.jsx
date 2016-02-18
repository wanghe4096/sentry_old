import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';

import Histogram from 'components/search/histogram';
import ResultField from 'components/search/resultField';
import ResultBody from 'components/search/resultBody';

const SearchIndex = React.createClass({
  render() {
    return (
      <DocumentTitle title="Search Result">
        <div className="search-result-tab">
          <Histogram/>
          <div className="search-result-body">
            <div className="s-container">
              <ResultField />
              <ResultBody />
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default SearchIndex;
