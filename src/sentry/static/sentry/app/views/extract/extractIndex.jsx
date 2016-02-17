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

import StreamTypeList from 'components/extract/streamTypeList';

const ExtractIndex = React.createClass({
  getInitialState() {
    return {}
  },
  render() {
    return (
      <DocumentTitle title="extract">
        <div className="extract-index">
          <div className="sub-header">
            <div className="nav pull-left">{t('Log Structure')}</div>
          </div>

          <div className="extract-index-body">
            <ul className="nav nav-tabs">
              <li role="presentation">
                <a href="#group" aria-controls="group" role="tab" data-toggle="tab">{t('Group')}</a>
              </li>
              <li role="presentation" className="active">
                <a href="#streamType" aria-controls="streamType" role="tab" data-toggle="tab">{t('Stream Type')}</a>
              </li>
              <li role="presentation">
                <a href="#fav" aria-controls="fav" role="tab" data-toggle="tab">{t('Fav')}</a>
              </li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane" id="group">
                1
              </div>
              <div role="tabpanel" className="tab-pane active" id="streamType">
                <StreamTypeList/>
              </div>
              <div role="tabpanel" className="tab-pane" id="fav">
                3
              </div>
            </div>

          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractIndex;
