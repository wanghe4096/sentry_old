import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {Modal,Button,Input,MenuItem,DropdownButton,Row,Col} from 'react-bootstrap';
import AlertsModal from './alertsModal';
import {t} from 'app/locale';

const style = require('css/alerts.less');

const AlertsApp = React.createClass({
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
      <DocumentTitle title="Alerts">
        <div className="sub-app alerts">
          <div className="container">
            <div className="sub-header">
              <h5 className="pull-left">告警</h5>
              <a href="javascript:;" className="pull-right new-alert" onClick={this.alertsPage}>
                <i className="fa fa-plus"></i>
                {t('新建告警规则')}
              </a>
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

              {this.state.showAlertsModal && (
                <AlertsModal
                  onHide={this.closeAlertsModal}
                />
              )}
                {/*
                <div className="col-md-6">
                  <div>
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
                                case "blackList": return <span>
                                                            指定的字段如果含有匹配值，则产生告警信息。
                                                            <Input type="text" label={t('设定匹配字段')} placeholder={t('keywords')} />
                                                            <Input type="text" label={t('设定匹配值')} placeholder={t('val')} />
                                                         </span>;
                                case "whitelist":  return <span>
                                                            指定的字段未出现匹配值，则产生告警信息。
                                                            <Input type="text" label={t('设定匹配字段')} placeholder={t('keywords')} />
                                                            <Input type="text" label={t('设定匹配值')} placeholder={t('val')} />
                                                         </span>;
                                case "change":  return <span>
                                                            在设定的时间范围内，如果指定字段出现了新的值，则告警。（默认不统计没有指定字段的event）
                                                            <Input label={t('时间范围')} help={t('查询所选时间之前的数据')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={6}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                                <Col xs={6}>
                                                                  <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                    <option value="minute">{t('minute')}</option>
                                                                    <option value="hour">{t('hour')}</option>
                                                                    <option value="day">{t('day')}</option>
                                                                    <option value="week">{t('week')}</option>
                                                                  </Input>
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                            <Input type="text" label={t('设定需要监控的字段')} placeholder={t('keywords')} />
                                                         </span>;
                                case "frequency":  return <span>
                                                            在设定的时间范围内必须出现设定的event数目，否则触发告警。
                                                            <Input label={t('设定时间范围及事件数')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={5}>
                                                                  <input type="text" className="form-control col-xs-11" placeholder="val" />
                                                                  <span>条</span>
                                                                </Col>
                                                                <Col xs={4}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                                <Col xs={3}>
                                                                  <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                    <option value="minute">{t('minute')}</option>
                                                                    <option value="hour">{t('hour')}</option>
                                                                    <option value="day">{t('day')}</option>
                                                                    <option value="week">{t('week')}</option>
                                                                  </Input>
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                         </span>;
                                case "spike":  return <span>
                                                            比较从现在和前一个周期范围内，运行查询之间的差异值，不到则告警。
                                                            <Input label={t('时间范围')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={6}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                                <Col xs={6}>
                                                                  <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                    <option value="minute">{t('minute')}</option>
                                                                    <option value="hour">{t('hour')}</option>
                                                                    <option value="day">{t('day')}</option>
                                                                    <option value="week">{t('week')}</option>
                                                                  </Input>
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                            <Input label={t('比较')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={6}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                                <Col xs={6}>
                                                                  <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                    <option value="minute">{t('minute')}</option>
                                                                    <option value="hour">{t('hour')}</option>
                                                                    <option value="day">{t('day')}</option>
                                                                    <option value="week">{t('week')}</option>
                                                                  </Input>
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                            <Input type="text" label={t('设定告警值')} placeholder={t('val')} />
                                                         </span>;
                                case "flatline":  return <span>
                                                            在设定的时间范围内,出现的event超过设定值，则触发告警。
                                                            <Input label={t('设定时间范围及事件数')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={5}>
                                                                  <input type="text" className="form-control col-xs-11" placeholder="val" />
                                                                  <span>条</span>
                                                                </Col>
                                                                <Col xs={4}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                                <Col xs={3}>
                                                                  <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                    <option value="minute">{t('minute')}</option>
                                                                    <option value="hour">{t('hour')}</option>
                                                                    <option value="day">{t('day')}</option>
                                                                    <option value="week">{t('week')}</option>
                                                                  </Input>
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                         </span>;
                                case "newterm":  return <span>
                                                          若指定字段出现了新值，则触发告警。
                                                          <Input type="text" label={t('设定需要监控的字段')} placeholder={t('keywords')} />
                                                        </span>;
                                case "cardinality":  return <span>
                                                            在设定的时间范围内值高于或者低于一个设定的值，否则触发告警。
                                                            <Input label={t('设定时间范围，字段，条件')} wrapperClassName="wrapper">
                                                              <Row>
                                                                <Col xs={4} className="no-p-l-r">
                                                                  <Col xs={6}>
                                                                    <Input type="text" placeholder={t('val')} />
                                                                  </Col>
                                                                  <Col xs={6} className="no-p-l-r">
                                                                    <Input type="select" className="noborder-l-radius" placeholder="select">
                                                                      <option value="minute">{t('minute')}</option>
                                                                      <option value="hour">{t('hour')}</option>
                                                                      <option value="day">{t('day')}</option>
                                                                      <option value="week">{t('week')}</option>
                                                                    </Input>
                                                                  </Col>
                                                                </Col>
                                                                <Col xs={3}>
                                                                  <input type="text" className="form-control" placeholder={t('keywords')} />
                                                                </Col>
                                                                <Col xs={2} className="no-p-l-r">
                                                                  <Input type="select" className="noborder-l-radius" placeholder={t('方向')}>
                                                                    <option value="equal">{t('高于')}</option>
、                                                                    <option value="under">{t('低于')}</option>
                                                                  </Input>
                                                                </Col>
                                                                <Col xs={3}>
                                                                  <input type="text" className="form-control" placeholder="val" />
                                                                </Col>
                                                              </Row>
                                                            </Input>
                                                         </span>;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                      <div className="form-group clearfix">
                        <label className="col-xs-2">{t('执行频率')}</label>
                        <span className="col-xs-10">
                          <Row>
                            <Col xs={6}>
                              <input type="text" className="form-control" placeholder="val" />
                            </Col>
                            <Col xs={6}>
                              <Input type="select" className="noborder-l-radius" placeholder="select">
                                <option value="minute">{t('minute')}</option>
                                <option value="hour">{t('hour')}</option>
                                <option value="day">{t('day')}</option>
                                <option value="week">{t('week')}</option>
                              </Input>
                            </Col>
                          </Row>
                        </span>
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
                        <span className="alert-option" onClick={this.handleWay}>
                          <i className={this.state.show?"fa fa-caret-down":"fa fa-caret-right"}></i>
                          {t('Other Options')}
                        </span>
                        {this.state.show ?
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
                          :''
                        }
                        </div>
                      </div>

                  </div>
                </div>
                */}
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default AlertsApp;

{/*
<input type="text" className="form-control col-xs-2 noborder-r-radius" />
<Input type="select" className="col-xs-2 noborder-l-radius" placeholder="select">
  <option value="minute">{t('minute')}</option>
  <option value="hour">{t('hour')}</option>
  <option value="day">{t('day')}</option>
  <option value="week">{t('week')}</option>
</Input>
<span>之内</span>
*/}
