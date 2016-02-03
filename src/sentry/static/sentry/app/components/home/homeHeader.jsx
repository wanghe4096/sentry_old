import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ApiMixin from 'mixins/apiMixin';
import AlertActions from 'actions/alertActions.jsx';
import AlertStore from 'stores/alertStore';

const HomeHeader = React.createClass({

  mixins:[
    ApiMixin
  ],

  getInitialState: function () {
    return {show: true};
  },

  handleClick: function () {
    this.setState({
      show: !this.state.show
    });
    $(this.refs.header).toggleClass('ani-fold')
  },

  addDemo() {
    AlertActions.addAlert(t('Being imported demo data!'), 'success', 1000 * 60 * 30);
    const alertId = AlertStore.count;
    this.api.request('/api/0/create_demo', {
      method: 'post',
      success: function (msg) {
        AlertActions.addAlert(t('Create demo data is successfully!'), 'success', 3000);
        AlertActions.closeAlert(alertId);
      },
      error: function () {
        AlertActions.addAlert(t('Create demo data failed!'), 'error');
        AlertActions.closeAlert(alertId);
      }
    });
  },

  render() {
    var text = this.state.show ? '关闭' : '显示';

    return (
      <div className="home-header" ref="header">
        <div className="home-getstart clearfix">

          <h5>欢迎使用LogInsight</h5>
          <a href="javascript:;" className="close" onClick={this.foldHandler}>×</a>
          <ul className="home-getstart-nav text-center">
            <li>
              <a href="javascript:;">
                <i className="fa fa-plus-circle"/>创建组织
              </a>
              <p>首次登陆需要创建一个组织用于管理团队和项目</p>
            </li>
            <li>
              <a onClick={this.addDemo}>
                <i className="fa fa-magic"/>加载Demo
              </a>
              <p>创建一个演示项目</p>
            </li>
            <li>
              <a href="http://www.loginsight.cn/contact_us.html" target="_blank">
                <i className="fa fa-comments-o"/>联系我们
              </a>
              <p>可以把您的意见反馈给我们</p>
            </li>
          </ul>

          <a href="javascript:;" className="toggle" onClick={this.handleClick}>
            <span className="label-open">{text}</span>
          </a>
        </div>
      </div>
    );
  }
});

export default HomeHeader;

