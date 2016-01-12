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

  mixins: [History],

  contextTypes: {
    organization: PropTypes.Organization
  },

  foldHandler() {
    let $menu = $(this.refs.menu);
    $menu.toggleClass('bt-menu-open');
  },

  render() {

    let org = this.context.organization || OrganizationStore.items[0];

    return (
      <div className="leftbar clearfix">
        <div className="op-info-left-panel clearfix">
          <div className="op-thumb">
            <nav id="bt-menu" className="bt-menu" ref="menu">
              <a className="bt-menu-trigger" onClick={this.foldHandler}>
                <img src={`${Sentry.ConfigStore.config.mediaUrl}/images/org-logo-normal.png`} className="op-avatar"/>
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
                <li><a href="#" className="fa fa-dashboard" /></li>
                <li><a href="#" className="fa fa-refresh">+</a></li>
                <li><a href="#" className="fa fa-lock" /></li>
                <li><a href="#" className="fa fa-sign-out" /></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="left-nav clearfix">
          <div className="left-primary-nav">
            <ul id="myTab">
              <li>
                <Link
                  to={`/${org.slug}/issues`}
                  activeClassName="active"
                  className="fa fa-home"
                  title="主页"/>

                <Link
                  to={`/${org.slug}/storage`}
                  activeClassName="active"
                  className="fa fa-th-large"
                  title="主页"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default BorderMenu;