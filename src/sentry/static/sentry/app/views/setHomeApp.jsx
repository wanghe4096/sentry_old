import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {Modal,Button,Input,MenuItem,DropdownButton,Row,Col} from 'react-bootstrap';
import AlertsModal from './alertsModal';
import {t} from 'app/locale';

const style = require('css/home.less');

const SetHomeApp = React.createClass({
  getInitialState() {
    return {
      showAlertsModal: false
    }
  },

  closeAlertsModal() {
     this.setState({
       showAlertsModal: false,
     });
  },

  alertsPage() {
    this.setState({
      showAlertsModal: true,
    });
  },

  componentWillMount() {
    style.use();
  },

  componentWillUnmount() {
    style.unuse();
  },
  render() {
    return (
      <DocumentTitle title="Home Set">
        <div className="sub-app">
          <div className="container">
            <div className="sub-header">
              <h5 className="pull-left">{t('主页设置')}</h5>
            </div>
            <div className="sub-content">
              <h6>选择您简要作为首页显示的内容，默认为您设定的仪表盘。</h6>
                <ul className="home-getstart-nav text-center set-home">
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-bug"/>错误管理
                    </a>
                    {/*
                    <div className="set-check">
                      <i className="fa fa-check"></i>
                    </div>
                    */}
                  </li>
                  <li>
                    <a onClick={this.addDemo}>
                      <i className="fa fa-database"/>日志仓库
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-columns"/>实时日志
                    </a>
                  </li>
                </ul>
                <div>
                  <div className="col-md-3"></div>
                  <div className="col-md-6 clearfix">
                    <Input type="select" label={t('选择你即将要设置为首页的仪表盘')} className="select-height" placeholder="select dashboard">
                      <option value="dashboard1">{t('dashboard1')}</option>
                      <option value="dashboard2">{t('dashboard2')}</option>
                      <option value="dashboard3">{t('dashboard3')}</option>
                      <option value="dashboard4">{t('dashboard4')}</option>
                    </Input>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <div className="homeset-save">
                  <button className="btn btn-success">点击更改</button>
                </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default SetHomeApp;
