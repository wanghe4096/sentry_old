/**
 * Title: structureIndex.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */
import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router';
import {t} from 'app/locale';

const ExtractIndex = React.createClass({
  getInitialState(){
    return {}
  },
  render() {
    return (
      <div className="extract-index">
        <div className="sub-header">
          <h5>{t('Log Structure')}</h5>
        </div>
        <h3>Index</h3>
      </div>
    )
  }
});

ExtractIndex.title = 'Log Extract';
ExtractIndex.path = '/extract';

export default ExtractIndex;