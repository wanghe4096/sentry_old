import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {Modal,Button,Input} from 'react-bootstrap';
import {t} from 'app/locale';

const style = require('css/alerts.less');

const AlertsApp = React.createClass({
  getInitialState() {
    return {
      click: true
    }
  },

  handleClick() {
    this.setState({click: !this.state.click})
  },

  componentWillMount() {
    style.use();
  },

  componentWillUnmount() {
    style.unuse();
  },
  render() {
    return (
      <DocumentTitle title="Alerts">
        <div className="sub-app alerts">
          <div className="container">
            <div className="sub-header">
              <h5>告警</h5>
            </div>
            <div className="sub-content">
              <a href="javascript:;" className="pull-right new-alert" onClick={this.handleClick}>
                <i className="fa fa-plus"></i>
                {t('新建告警规则')}
              </a>
              {this.state.click?
              <div className="col-md-12">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div>
                    <span></span>
                      <Input
                        type="text"
                        name="alertname"
                        value={this.state.hostName}
                        placeholder={t('输入您的警告名称 ...')}
                        label={t('名称')}
                        help={t('* 设置您的警告名,方便搜索.')}
                        //hasFeedback
                        autoFocus
                        //disabled={inSaving}
                        labelClassName=""
                        wrapperClassName=""
                        onChange={this.handleChange}
                      />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              :
                ''
              }
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default AlertsApp;
