import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from 'components/header';
import {t} from '../locale';
import HomeHeader from 'components/home/homeHeader';
import HomeSetDashboard from 'components/home/homesetDashboard';

const HomeCss = require('css/home.less');

const HomeApp = React.createClass({
  getTitle() {
    return 'Home';
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
              <section className="body">
                <HomeHeader />
                <HomeSetDashboard />
              </section>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default HomeApp;

