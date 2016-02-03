import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from '../components/header';
import {t} from '../locale';
import HomeHeader from '../components/home/homeHeader';
import HomeSetDashboard from '../components/home/homesetDashboard';


const HomeApp = React.createClass({
  getTitle() {
    return 'Home';
  },

  getInitialState: function() {
    return {show: true};
  },

  handleClick: function(event) {
    this.setState({show: !this.state.show});
  },

  //foldHandler() {
  //  let $menu = $(this.refs.menu);
  //  $menu.toggleClass('bt-nav-hide');
  //  this.setState({show: !this.state.show});
  //},

  render() {
    var text = this.state.show ? '关闭' : '显示';
    // TODO(dcramer): show additional resource links
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
          {/*
          <Footer />
          */}
        </div>
      </DocumentTitle>
    );
  }
});

export default HomeApp;

