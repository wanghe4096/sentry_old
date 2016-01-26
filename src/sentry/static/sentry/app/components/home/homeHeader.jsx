import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const HomeHeader = React.createClass({
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

    return (
        <div className="page-header">
          <div className="home-getstart clearfix">
            <ReactCSSTransitionGroup
                transitionName="bt-nav"
                component="div"
                className="bt-nav"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
              { this.state.show && (
                  <div className="col-md-12 bt-nav" ref="menu">
                    <h6>欢迎使用LogInsight</h6>
                    <a href="javascript:;" className="close" onClick={this.foldHandler}>
                      ×
                    </a>
                    <ul className="home-getstart-nav text-center">
                      <li>
                        <a href="javascript:;">
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
                        <a href="javascript:;">
                          <i className="fa fa-comments-o"></i>
                          联系我们
                        </a>
                        <p>可以把您的意见反馈给我们</p>
                      </li>
                    </ul>
                  </div>
              ) }
            </ReactCSSTransitionGroup>
              <a href="javascript:;" className="toggle" onClick={this.handleClick}>
                  <span className="label-open">
                    {text}
                  </span>
              </a>
          </div>
        </div>
    );
  }
});

export default HomeHeader;

