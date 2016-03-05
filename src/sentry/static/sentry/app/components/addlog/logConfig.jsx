import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';

import {Modal,Input} from 'react-bootstrap';
import {History,Link} from 'react-router';
import ApiMixin from '../../mixins/apiMixin';
import LoadingError from '../../components/loadingError';
import LoadingIndicator from '../../components/loadingIndicator';

import MenuItem from '../menuItem';
import LinuxModal from './linuxModal';
import UploadModal from './uploadModal';

const LogConfig = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],

  getInitialState: function() {
    return {
      showLinuxModal: false,
      showUploadModal: false
    };
  },

  closeLinuxModal() {
     this.setState({
       showLinuxModal: false,
     });
  },

  closeUploadModal() {
    this.setState({
      showUploadModal: false
    });
  },

  linuxPage() {
    this.setState({
      showLinuxModal: true,
    });
  },

  uploadPage() {
    this.setState({
      showUploadModal: true
    });
  },


  render() {
    let isFirstSteP = this.history.isActive(`/loginsight/addlog/`,null,true);
    var names = ['zxs','yaoyao','weijing'];

    return (
      <div className="addlog">
        <div className="add">
          <div className="project-install log-install">
            <h2 className="card-heading simple no-p-l">
              <div className="container-alligment">
                <span className={isFirstSteP?`selected-step`:`unselected-step`}>1</span>
                <span className={isFirstSteP?`selected-step-text`:`unselected-step-text`}>选择日志接入方式</span>
              </div>
              <div className="container-alligment">
                <span className={isFirstSteP?`unselected-step`:`selected-step`}>2</span>
                <span className={isFirstSteP?`selected-step-text`:`unselected-step-text`}>配置</span>
              </div>
            </h2>
            <div className="card-body clearfix">
              <div className="add-log clearfix">
                {/* agent */}
                <div className="col-md-6 select-log-type">
                  <div className="select-type-text">
                    <h3 className="select-type-name">Agent方式</h3>
                    <ul>
                      <li>实时采集</li>
                      <li>无数据丢失</li>
                      <li>一键安装，自动接入</li>
                    </ul>
                  </div>
                  <ul className="select-type-icon">
                    <MenuItem  onSelect={this.linuxPage}>
                        <div className="icon-circle-setup">
                          <i className="fa fa-linux"></i>
                        </div>
                        <div className="icon-text">linux</div>
                    </MenuItem>
                    {this.state.showLinuxModal && (
                      <LinuxModal
                       onHide={this.closeLinuxModal}
                      />
                    )}
                    <MenuItem  onSelect={this.linuxPage}>
                      <div className="icon-circle-setup">
                        <i className="fa fa-windows"></i>
                      </div>
                      <div className="icon-text">windows</div>
                    </MenuItem>
                    {/*
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-windows"></i>
                      </div>
                      <div className="icon-text">windows</div>
                    </a>
                     */}
                  </ul>
                </div>
                {/* syslog */}
                <div className="col-md-6 select-log-type">
                  <div className="select-type-text">
                    <h3 className="select-type-name">Syslog无代理方式</h3>
                    <ul>
                      <li>无需安装任何应用</li>
                      <li>容易配置</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-rslog"></i>
                      </div>
                      <div className="icon-text">Rslog</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslog"></i>
                      </div>
                      <div className="icon-text">Syslog-Ng</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">Syslogd</div>
                    </a>
                  </div>
                </div>
                {/* language */}
                <div className="col-md-12 select-log-type border-t-b">
                  <div className="select-type-text">
                    <h3 className="select-type-name">编程语言支持</h3>
                    <ul>
                      <li>直接从应用内部发送日志</li>
                      <li>无需担心日志存储</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-rslog"></i>
                      </div>
                      <div className="icon-text">Nodejs</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslog"></i>
                      </div>
                      <div className="icon-text">PHP</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">Python</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">Ruby</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">java</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">GO</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">javascript</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">C#</div>
                    </a>
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-syslogd"></i>
                      </div>
                      <div className="icon-text">object-c</div>
                    </a>
                  </div>
                </div>
                {/* upload */}
                <div className="col-md-6 select-log-type">
                  <div className="select-type-text">
                    <h3 className="select-type-name">手工方法</h3>
                    <ul>
                      <li>手工上传测试体验</li>
                      <li>HTTP</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <MenuItem  onSelect={this.uploadPage}>
                      <div className="icon-circle-setup">
                        <i className="fa fa-upload"></i>
                      </div>
                      <div className="icon-text">上传</div>
                    </MenuItem>
                    {this.state.showUploadModal && (
                      <UploadModal
                        onHide={this.closeUploadModal}
                      />
                    )}

                    {/*
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-upload"></i>
                      </div>
                      <div className="icon-text">上传</div>
                    </a>
                    */}
                    <a href="javascript:;">
                      <div className="icon-circle-setup">
                        <i className="fa fa-http"></i>
                      </div>
                      <div className="icon-text">Http</div>
                    </a>
                  </div>
                </div>
              </div>

              <ul className="addlog-steps hide">
                {/* linux */}
                <li className="box">
                  <div className="box-header">
                    <h3>linux配置</h3>
                  </div>
                  <div className="box-content with-padding">
                    <div className="section">
                      <h4>安装LogInsight Linux的代理程序</h4>
                      <p>复制并粘贴下面的代码片段到你的终端上安装代理</p>
                      <span className="code">
                        wget http://loginsight.cn/loginsight/
                      </span>
                    </div>
                    <div className="form-actions">
                      <a href="#" className="btn btn-primary ">完成</a>
                    </div>
                  </div>
                </li>
                {/* upload */}
                <li className="box">
                  <div className="box-header">
                    <h3>手动上传</h3>
                  </div>
                  <div className="box-content with-padding">
                    <div className="section">
                      <h4>选择来源</h4>
                      <p>选定的文件</p>
                      <a href="javascript:;" className="btn btn-default dropz">选择文件</a>

                      <div className="dropzone">
                        {/*
                         <i className="fa fa-upload-alt dropzone-icon"></i>
                         */}
                        <svg className="dropzone-icon" width="72px" height="88px" viewBox="0 0 72 88" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <g className="fill">
                            <path d="M50,27 L68.0005854,27 C70.2022516,27 72,28.7919267 72,31.0023804 L72,83.9976196 C72,86.2074215 70.2094011,88 68.0005854,88 L3.99941455,88 C1.79774843,88 0,86.2080733 0,83.9976196 L0,31.0023804 C0,28.7925785 1.79059889,27 3.99941455,27 L21,27 L21,32 L5.99898406,32 C5.4472604,32 5,32.4408979 5,32.9958767 L5,82.0041233 C5,82.5541308 5.44605521,83 5.99898406,83 L66.0010159,83 C66.5527396,83 67,82.5591021 67,82.0041233 L67,32.9958767 C67,32.4458692 66.5539448,32 66.0010159,32 L50,32 L50,27 Z"></path>
                            <path d="M41.9634682,10 L41.9634682,28 L46.9634682,28 L46.9634682,5 L44.4634682,5 L23.9634682,5 L23.9634682,10 L41.9634682,10 Z" transform="translate(35.463468, 16.500000) rotate(-45.000000) translate(-35.463468, -16.500000) "></path>
                            <rect x="33" y="3" width="5" height="51"></rect>
                          </g>
                        </svg>
                        <svg className="dropzone-box" width="580px" height="170px" viewBox="0 0 580 170" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <rect className="dashed" x="1" y="1" rx="10" ry="10" width="578" height="168"></rect>
                        </svg>
                        <div className="dropzone-text">
                          <h2>将您的数据文件拖到这儿</h2>
                        </div>
                      </div>
                      <span className="max-filesize text-center">最大文件上载大小为500 Mb</span>
                    </div>
                    <div className="section clearfix">
                      <h4>日志类型</h4>
                      <div className="col-md-4">
                        <Input type="select" placeholder="select" className="form-control select-height">
                          <option value="select">log</option>
                          <option value="select">json</option>
                          <option value="other">自定义</option>
                        </Input>
                      </div>
                    </div>
                    <div className="form-actions">
                      <a href="#" className="btn btn-primary ">完成</a>
                    </div>
                  </div>
                </li>
              </ul>
              {/* config result */}
              <div className="hide box">
                <div className="box-header">
                  <h3>配置结果</h3>
                </div>
                <div className="box-content with-padding">
                  <div className="section">
                    <h4>配置成功</h4>
                    <div className="success-option start-searching">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-search"></i>
                      </a>
                      <p>
                        <span>开始搜索</span>
                        <a href="javascript:;" className="external" target="_blank"> 查看搜索教程。</a>
                      </p>
                    </div>
                    <div className="success-option add-more-data">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-plus"></i>
                      </a>
                      <p> 添加更多数据
                        <a href="javascript:;" className="external" target="_blank"> 查看添加数据教程。</a>
                      </p>
                    </div>
                    <div className="success-option build-dashboards">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-th-large"></i>
                      </a>
                      <p> 构建仪表板
                        <a href="/zh-CN/help?location=learnmore.dashboards" className="external" target="_blank"> 查看构建仪表板教程。</a>
                      </p>
                    </div>
                  </div>
                  <div className="form-actions">
                    <a href="#" className="btn btn-primary">返回</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default LogConfig;
