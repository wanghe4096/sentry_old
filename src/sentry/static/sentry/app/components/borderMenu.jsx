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
import {t} from '../locale';

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
                <div className="username-info">
                  <div>John.Smith</div>
                  <div className="font-bold user-link">用户权限</div>
                </div>
              </a>
              <ul>
                <li><a href="#">定义抽取规则</a></li>
                <li><a href="/streamtype">事件类型管理</a></li>
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
                    to={`/${org.slug}/home/`}
                    activeClassName="active"
                    className="fa fa-home"
                    title={t('issues')}/>
              </li>
              <li>
                <Link
                  to={`/${org.slug}/events/`}
                  activeClassName="active"
                  className="fa fa-bug"
                  title={t('issues')}/>
              </li>
              <li>
                <Link
                    to={`/${org.slug}/storage/`}
                    className="fa fa-database"
                    activeClassName="active"
                    title={t('log storage')}/>
              </li>
              <li className="hide">
                <Link
                  to={`/`}
                  className="fa fa-times"
                  title="Error Report"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default BorderMenu;