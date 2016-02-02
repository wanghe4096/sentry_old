import React from 'react';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';

const searchApp = React.createClass({
  render() {
    return (
      <DocumentTitle title="search">
        <div className="sub-app sa-storage">
          <div className="container">
            <div className="row content">
              <div className="col-md-12 sub-header">
                <h5>{t('search')}</h5>
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

export default searchApp;