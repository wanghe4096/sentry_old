import React from 'react';
import DocumentTitle from 'react-document-title';
import Footer from '../components/footer';
import Header from '../components/header';
import {t} from '../locale';

const HomeApp = React.createClass({
  getTitle() {
    return 'Home';
  },

  getInitialState: function() {
    return {show: true};
  },

  foldHandler() {
    let $menu = $(this.refs.menu);
    $menu.toggleClass('bt-nav-hide');
    this.setState({show: !this.state.show});
  },

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
                <div className="page-header">
                  <div className="home-getstart clearfix">
                    <div className="col-md-12 bt-nav" ref="menu">
                      <h6>欢迎使用LogInsight</h6>
                      <a href="javascript:;" className="close" onClick={this.foldHandler}>
                        ×
                      </a>
                      <ul className="home-getstart-nav text-center">
                        <li>
                          <a href="javasscript:;">
                            <i className="fa fa-plus-circle"></i>
                            创建组织
                          </a>
                          <p>首次登陆需要创建一个组织用于管理团队和项目</p>
                        </li>
                        <li>
                          <a href="javasscript:;">
                            <i className="fa fa-magic"></i>
                            加载Demo
                          </a>
                          <p>创建一个演示项目</p>
                        </li>
                        <li>
                          <a href="javasscript:;">
                            <i className="fa fa-comments-o"></i>
                            联系我们
                          </a>
                          <p>可以把您的意见反馈给我们</p>
                        </li>
                      </ul>
                    </div>
                    <a href="javascript:;" className="toggle" onClick={this.foldHandler}>
                      <span className="label-open">
                        {text}
                      </span>
                    </a>
                  </div>
                </div>
                <div className="home-dashboard-empty">
                  <a href="javascript:;">
                    <div className="icon-chart">
                      <div>
                        <span className="fa fa-5x fa-bar-chart"></span>
                        <span className="fa fa-5x fa-pie-chart"></span>
                      </div>
                      <div>
                        <span className="fa fa-5x fa-area-chart"></span>
                        <span className="fa fa-5x fa-line-chart"></span>
                      </div>
                    </div>
                    <h4>选择主页仪表板</h4>
                  </a>
                </div>
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

