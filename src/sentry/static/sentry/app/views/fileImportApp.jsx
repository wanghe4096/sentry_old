import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from 'components/header';
import {t} from '../locale';
import FileImportGroup from 'components/fileimport/fileImportGroup';

const FileImportCss = require('css/fileimport.less');

const FileImportApp = React.createClass({
  getTitle() {
    return 'File Import';
  },

  getInitialState: function() {
    return {};
  },

  componentWillMount() {
    FileImportCss.use();
  },

  componentWillUnmount() {
    FileImportCss.unuse();
  },

  render() {
    return (
      <DocumentTitle title={this.getTitle()}>
        <div className="app home">
          <Header />
          <div className="sub-app">
            <div className="container">
              <div className="sub-header">
                <h5>{t('File Import')}</h5>
              </div>
              <FileImportGroup />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default FileImportApp;
