/**
 * Title: borderMenu.jsx
 * Author: bold
 * Date: 12/30/15.
 * Description: 。
 */

import React,{createClass} from 'react';
import Reflux from 'reflux';
import {History,IndexLink,Link} from 'react-router';
import OrganizationStore from 'stores/organizationStore';
import PropTypes from '../proptypes';
import {t} from '../locale';
import ConfigStore from 'stores/configStore';

const BorderMenu = createClass({

  mixins: [
    History,
    Reflux.listenTo(ConfigStore, 'onConfigChange')
  ],

  contextTypes: {
    organization: PropTypes.Organization
  },

  getInitialState() {
    return {
      user: ConfigStore.config.user || {},
      folded: true,
      app: [
        {
          path: 'home',
          iconClassName: 'fa fa-home',
          title: t('Home')
        },
        {
          path: 'events',
          iconClassName: 'fa fa-bug',
          title: t('Events')
        },
        {
          path: 'storage',
          iconClassName: 'fa fa-database',
          title: t('Log storage')
        },
        //{
        //  path: 'search',
        //  iconClassName: 'fa fa-search',
        //  title: t('Search')
        //},
        //{
        //  path: 'dashboard',
        //  iconClassName: 'fa fa-dashboard',
        //  title: t('Search')
        //},
        //{
        //  path: 'addlog',
        //  iconClassName: 'fa fa-cloud-upload',
        //  title: t('Add Log')
        //},
        {
          path: 'live',
          iconClassName: 'fa fa-columns',
          title: t('Live Tail')
        },
        {
          path: 'powerpack',
          iconClassName: 'glyphicon glyphicon-briefcase',
          title: t('Powerpack')
        }
      ]
    }
  },

  onConfigChange(config) {
    this.setState({
      user: config.user
    });
  },

  foldHandler() {
    //let $menu = $(this.refs.menu);
    //$menu.toggleClass('bt-menu-open');
    this.setState({
      folded: !this.state.folded
    });
  },

  keyDownHandler(evt){

    if (evt.keyCode === 27) {
      this.setState({folded: true});
    }
  },

  blurHandler(evt) {
    //console.log(evt.clientX, evt.clientY);
    if (evt.clientX > 270 && (evt.clientY < (window.screen.availHeight - 50))) {
      this.setState({folded: true});
    }
  },

  componentDidMount() {
    $(document).on('keydown', this.keyDownHandler);
    $(document).on('click', this.blurHandler);
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
    $(document).off('click', this.blurHandler);
  },

  renderAppIcon() {
    let org = this.context.organization || OrganizationStore.items[0];

    return this.state.app.map((app, i) => {
      return (
        <li key={i}>
          <Link
            to={`/${org.slug}/${app.path}/`}
            activeClassName="active"
            className={app.iconClassName}
            title={app.title}/>
        </li>
      )
    });
  },

  render() {

    let org = this.context.organization || OrganizationStore.items[0];
    let menuClass = " bt-menu-open";

    return (
      <div className="leftbar clearfix">
        <div className="op-info-left-panel clearfix">
          <div className="op-thumb">
            <nav id="bt-menu" className={`bt-menu ${this.state.folded ? '':'bt-menu-open'}`} ref="menu">
              <a className="bt-menu-trigger" onClick={this.foldHandler}>
                <img src={`${Sentry.ConfigStore.config.mediaUrl}/images/org-logo-normal.png`}
                     className="op-avatar"/>
                <div className="username-info">
                  <div>{this.state.user.name}</div>
                  <div className="font-bold user-link">用户权限</div>
                </div>
              </a>
              <ul>
                <li><a href="#">定义抽取规则</a></li>
                <li>
                  <Link
                    to={'/' + org.slug + '/kb/streamtype/'}
                    onClick={()=>{ this.setState({folded: true}); }}
                  >事件类型管理</Link></li>
                <li><a href="#">项目管理/我参与的项目</a></li>
                <li><a href="#">Tag管理</a></li>
                <li><a href="#">账号设置</a></li>
                <li><a href="#">告警规则管理</a></li>
                <li><a href="#">主页设置</a></li>
                <li><a href="#">数据源管理（个人）</a></li>
              </ul>
              <ul>
                <li><a href="#" className="fa fa-dashboard"/></li>
                <li><a href="#" className="fa fa-refresh">+</a></li>
                <li><a href="#" className="fa fa-lock"/></li>
                <li><a href="#" className="fa fa-sign-out"/></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="left-nav clearfix">
          <div className="left-primary-nav">
            <ul id="myTab">
              {
                this.renderAppIcon()
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default BorderMenu;
