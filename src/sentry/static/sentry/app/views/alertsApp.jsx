import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {Modal,Button,Input,MenuItem,DropdownButton} from 'react-bootstrap';
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
                        placeholder={t('输入您的告警名称 ...')}
                        label={t('名称')}
                        help={t('* 设置您的告警名称,方便搜索.')}
                        //hasFeedback
                        autoFocus
                        //disabled={inSaving}
                        labelClassName="col-xs-2"
                        wrapperClassName="col-xs-10"
                        onChange={this.handleChange}
                        className="alert-main"
                      />
                      <Input
                        type="text"
                        name="alertdesc"
                        value={this.state.hostName}
                        placeholder={t('输入您的告警描述 ...')}
                        label={t('描述')}
                        help={t('* 设置您的告警描述,方便查询.')}
                        //hasFeedback
                        autoFocus
                        //disabled={inSaving}
                        labelClassName="col-xs-2"
                        wrapperClassName="col-xs-10"
                        onChange={this.handleChange}
                      />
                      <div className="form-group clearfix">
                        <label className="col-xs-2">{t('搜索内容')}</label>
                        <span className="col-xs-10">
                        {t('此处为从search获取的搜索语句')}
                        </span>
                      </div>
                      <Input
                        type="select"
                        label={t('告警类型')}
                        labelClassName="col-xs-2"
                        wrapperClassName="col-xs-10"
                        placeholder={t('选择您的告警类型 ...')}
                        help={t('* 选择您需要的告警类型.')}
                        className="select-height">
                        <option value="select">{t('Any')}</option>
                        <option value="other">{t('BlackList')}</option>
                        <option value="other">{t('Whitelist')}</option>
                        <option value="other">{t('Change')}</option>
                        <option value="other">{t('Frequency')}</option>
                        <option value="other">{t('Spike')}</option>
                        <option value="other">{t('Flatline')}</option>
                        <option value="other">{t('New Term')}</option>
                        <option value="other">{t('Cardinality')}</option>
                      </Input>
                      <div className="form-group clearfix">
                        <label className="col-xs-2">{t('告警方式')}</label>
                        <div className="col-xs-10">
                          <Input
                            type="checkbox"
                            label={t('Email')}
                            labelClassName=""
                            checked>
                          </Input>
                          <Input
                            type="text"
                            name="alertdesc"
                            value={this.state.hostName}
                            placeholder={t('输入您的告警邮箱 ...')}
                            help={t('* 系统会将告警信息发送至您设置的邮箱.')}
                            //hasFeedback
                            autoFocus
                            //disabled={inSaving}
                            wrapperClassName="col-xs-12 no-p-l-r"
                            onChange={this.handleChange}
                          />
                        <span className="alert-option">
                          <i className="fa fa-caret-right"></i>
                          {t('Other Options')}
                        </span>
                        <ul className="other-option">
                          <li>
                            <label className="fa fa-weixin"></label>
                            <div className="col-md-12">
                              <Input
                                type="checkbox"
                                label={t('Web hook')}
                                labelClassName=""
                                checked>
                              </Input>
                              <Input
                                type="text"
                                name="alertdesc"
                                value={this.state.hostName}
                                placeholder={t('输入您的告警邮箱 ...')}
                                help={t('* 系统会将告警信息发送至Web hook.')}
                                //hasFeedback
                                autoFocus
                                //disabled={inSaving}
                                wrapperClassName="col-xs-12 no-p-l-r"
                                onChange={this.handleChange}
                              />
                            </div>
                          </li>
                          <li>
                            <label className="fa fa-weixin"></label>
                            <div className="col-md-12">
                              <Input
                                type="checkbox"
                                label={t('one alert')}
                                labelClassName=""
                                checked>
                              </Input>
                              <Input
                                type="text"
                                name="alertdesc"
                                value={this.state.hostName}
                                placeholder={t('输入您的服务账号 ...')}
                                help={t('* 系统会将告警信息发送至您的onealert账号.')}
                                //hasFeedback
                                autoFocus
                                //disabled={inSaving}
                                wrapperClassName="col-xs-12 no-p-l-r"
                                onChange={this.handleChange}
                              />
                            </div>
                          </li>
                        </ul>
                        </div>
                      </div>

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
