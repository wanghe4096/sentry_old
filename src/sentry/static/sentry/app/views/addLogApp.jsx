import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from 'components/header';
import {t} from '../locale';
import AddLogHeader from 'components/addlog/addLogHeader';
import LogConfig from 'components/addlog/logConfig';

const HomeCss = require('css/home.less');

const AddLogApp = React.createClass({
  getTitle() {
    return 'AddLog';
  },

  getInitialState: function() {
    return {};
  },

  componentWillMount() {
    HomeCss.use();
  },

  componentWillUnmount() {
    HomeCss.unuse();
  },

  render() {
    return (
      <DocumentTitle title={this.getTitle()}>
        <div className="app home">
          <Header />
          <div className="sub-app">
            <div className="content">
              <section className="body col-md-12">
                <AddLogHeader />
                <LogConfig />
              </section>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default AddLogApp;

