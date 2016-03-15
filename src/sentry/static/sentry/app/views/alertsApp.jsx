import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {Modal,Button,Input,MenuItem,DropdownButton} from 'react-bootstrap';
import {t} from 'app/locale';

const style = require('css/alerts.less');

const AlertsApp = React.createClass({
  getInitialState() {
    return {
      click: true,
      alerttype: 'any'
    }
  },

  handleClick() {
    this.setState({click: !this.state.click})
  },

  handleSelect(e) {
    // this.setState({
    //   team: e.target.value,
    //   error: false
    // });
    this.setState({
      alerttype: e.target.value
    });
    alert(e.target.value)
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
              <div className="alert-group">
                <div className="alert-list alert-header">
                  <div className="alert-check p-l-md">
                    <Input type="checkbox" checked readOnly />
                  </div>
                  <div className="alert-name p-l-md">
                    NAME
                  </div>
                  <div className="alert-search p-l-md">
                    SEARCH
                  </div>
                  <div className="alert-desc p-l-md">
                    DESC
                  </div>
                  <div className="alert-infomation p-l-md">
                    INFOMATION
                  </div>
                  <div className="alert-action p-l-md">
                    ACTION
                  </div>
                </div>
                <ul className="no-p-l-r">
                  <li className="alert-list">
                    <div className="alert-check p-l-md">
                      <Input type="checkbox" checked readOnly />
                    </div>
                    <div className="alert-name p-l-md">
                      <span>
                        <strong>Demo Alert Name</strong>
                      </span>
                    </div>
                    <div className="alert-search p-l-md">
                      <span>value=20min</span>
                    </div>
                    <div className="alert-desc p-l-md">
                      <span>This is a demo</span>
                    </div>
                    <div className="alert-infomation text-short p-l-md">
                      <ul className="no-p-l-r">
                        <li>告警类型-<span>any</span></li>
                        <li>执行频率-<span>16次/时</span></li>
                        <li className="text-short"><span className="fa fa-weixin"></span>-<span>66666666@loginsight.cn</span></li>
                        <li><Input type="checkbox" label="允许" checked readOnly /></li>
                      </ul>
                    </div>
                    <div className="alert-action p-l-md">
                      <ul className="no-p-l-r">
                        <a href="javascript:;"><i className="fa fa-pencil"></i>EDIT</a>
                        <a href="javascript:;" className="alert-delete"><i className="fa fa-trash"></i>DELETE</a>
                      </ul>
                    </div>
                  </li>
                  <li className="alert-list">
                    <div className="alert-check p-l-md">
                      <Input type="checkbox" checked readOnly />
                    </div>
                    <div className="alert-name p-l-md">
                      <span>
                        <strong>Demo Alert Name</strong>
                      </span>
                    </div>
                    <div className="alert-search p-l-md">
                      <span>value=20min</span>
                    </div>
                    <div className="alert-desc p-l-md">
                      <span>This is a demo</span>
                    </div>
                    <div className="alert-infomation text-short p-l-md">
                      <ul className="no-p-l-r">
                        <li>告警类型-<span>any</span></li>
                        <li>执行频率-<span>16次/时</span></li>
                        <li className="text-short"><span className="fa fa-weixin"></span>-<span>66666666@loginsight.cn</span></li>
                        <li><Input type="checkbox" label="允许" checked readOnly /></li>
                      </ul>
                    </div>
                    <div className="alert-action p-l-md">
                      <ul className="no-p-l-r">
                        <a href="javascript:;"><i className="fa fa-pencil"></i>EDIT</a>
                        <a href="javascript:;" className="alert-delete"><i className="fa fa-trash"></i>DELETE</a>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
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
                        onChange={this.handleChange}project
                      />
                      <div className="form-group clearfix">
                        <label className="col-xs-2">{t('搜索内容')}</label>
                        <span className="col-xs-10">
                        {t('此处为从search获取的搜索语句')}
                        </span>
                      </div>
                      <div className="form-group clearfix">
                        <label className="col-xs-2">{t('告警类型')}</label>
                        <div className="col-xs-10">
                          <Input
                            type="select"
                            placeholder={t('选择您的告警类型 ...')}
                            help={t('* 选择您需要的告警类型.')}
                            className="select-height"
                            value={this.state.alerttype}
                            onChange={this.handleSelect}>
                            <option value="any">{t('Any')}</option>
                            <option value="blackList">{t('BlackList')}</option>
                            <option value="whitelist">{t('Whitelist')}</option>
                            <option value="change">{t('Change')}</option>
                            <option value="frequency">{t('Frequency')}</option>
                            <option value="spike">{t('Spike')}</option>
                            <option value="flatline">{t('Flatline')}</option>
                            <option value="newterm">{t('New Term')}</option>
                            <option value="cardinality">{t('Cardinality')}</option>
                          </Input>
                          <div className="alert-type">
                            {(() => {
                              switch (this.state.alerttype) {
                                case "any":   return <span>只要搜索有结果，就会产生告警信息。</span>;
                                case "blackList": return <span></span>;
                                case "whitelist":  return <span></span>;
                                case "change":  return ;
                                case "frequency":  return ;
                                case "spike":  return ;
                                case "flatline":  return ;
                                case "newterm":  return ;
                                case "cardinality":  return ;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
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
