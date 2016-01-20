/**
 * Title: structureApp.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';

const ExtractApp = React.createClass({
  getInitialState() {
    return {}
  },
  render() {
    return(
      <DocumentTitle title="Extract">
        <div className="sub-app sa-extract">
          <div className="container">
            <div className="row content">
              <div className="col-md-12 sub-header">
                <h5>{t('Log Structure')}</h5>
              </div>
              <div className="col-md-12">
                { this.props.children }
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractApp;