/**
 * Title: storageApp.jsx
 * Author: bold
 * Date: 1/15/16.
 * Description: 。
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';

const storageApp = React.createClass({
  render() {
    return (
      <DocumentTitle title="storage">
        <div className="sub-app sa-storage">
          <div className="container">
            <div className="row content">
              <div className="col-md-12 sub-header">
                <h5>{t('Log Storage')}</h5>
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

export default storageApp;