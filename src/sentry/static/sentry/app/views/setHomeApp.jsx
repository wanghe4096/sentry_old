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
                <ul className="home-getstart-nav text-center">
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-bug"/>错误管理
                    </a>
                  </li>
                  <li>
                    <a onClick={this.addDemo}>
                      <i className="fa fa-database"/>日志仓库
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-cloud-upload"/>添加数据
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-columns"/>实时日志
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-bell-o"/>告警管理
                    </a>
                  </li>
                </ul>
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
