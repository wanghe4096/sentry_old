/**
 * Title: borderMenu.jsx
 * Author: bold
 * Date: 12/30/15.
 * Description: 。
 */

import React,{createClass} from 'react';
import {History,IndexLink,Link} from 'react-router';
import OrganizationStore from '../stores/organizationStore';
import PropTypes from '../proptypes';

const BorderMenu = createClass({

  mixins: [ History ],

  contextTypes: {
    organization: PropTypes.Organization
  },

  foldHandler() {
    let $menu = $(this.refs.menu);
    $menu.toggleClass('bt-menu-open');
  },

  render() {

    let org = this.context.organization;

    return (
      <div className="leftbar clearfix">
        <div className="op-info-left-panel clearfix">
          <div className="op-thumb">
            <nav id="bt-menu" className="bt-menu" ref="menu">
              <a className="bt-menu-trigger" onClick={this.foldHandler}>
                <img src="images/avatar.jpg" className="op-avatar" />
              </a>
              <ul>
                <li><a href="#">定义抽取规则</a></li>
                <li><a href="#">事件类型管理</a></li>
                <li><a href="#">项目管理/我参与的项目</a></li>
                <li><a href="#">Tag管理</a></li>
                <li><a href="#">账号设置</a></li>
                <li><a href="#">告警规则管理</a></li>
                <li><a href="#">主页设置</a></li>
                <li><a href="#">数据源管理（个人）</a></li>
              </ul>
              <ul>
                <li><a href="#" className="fa fa-dashboard"></a></li>
                <li><a href="#" className="fa fa-refresh">+</a></li>
                <li><a href="#" className="fa fa-lock"></a></li>
                <li><a href="#" className="fa fa-sign-out"></a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="left-nav clearfix">
          <div className="left-primary-nav">
            <ul id="myTab">
              <li>
                <IndexLink
                  to={`/${org.slug}/`}
                  activeClassName="active"
                  className="fa fa-home"
                  title="主页"></IndexLink>
              </li>
              <li>
                <Link
                  to={`/organizations/${org.slug}/stats/`}
                  activeClassName="active"
                  className="fa fa-th-large"
                  title="仪表板"></Link>
              </li>
              <li>
                <a
                  onClick={() => window.location = `/account/settings/`}
                  className="fa fa-user"
                  title="用户设置"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default BorderMenu;