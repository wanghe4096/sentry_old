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
import WindowsModal from './windowsModal';
import RslogModal from './rslogModal';


const FileImportGroup = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],

  getInitialState: function() {
    return {
      showLinuxModal: false,
      showUploadModal: false,
      showRslogModal: false,
      showWindowsModal: false
    };
  },

  closeLinuxModal() {
     this.setState({
       showLinuxModal: false,
     });
  },

  closeWindowsModal() {
    this.setState({
      showWindowsModal: false
    });
  },

  closeRslogModal() {
    this.setState({
      showRslogModal: false
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

  windowsPage() {
    this.setState({
      showWindowsModal: false
    });
  },

  rslogPage() {
    this.setState({
      showRslogModal: true
    });
  },


  uploadPage() {
    this.setState({
      showUploadModal: false
    });
  },

  render() {

    return (
      <div className="addlog">
        <div className="add">
          <div className="project-install log-install">
            <div className="card-body clearfix">
              <div className="add-log clearfix">
                {/* agent */}
                <div className="col-md-6 select-log-type clearfix">
                  <div className="select-type-text">
                    <h3 className="select-type-name">{t('Agent方式')}</h3>
                    <ul>
                      <li>{t('实时采集')}</li>
                      <li>{t('无数据丢失')}</li>
                      <li>{t('一键安装，自动接入')}</li>
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
                    <MenuItem  onSelect={this.windowsPage} className="disable">
                      <div className="icon-circle-setup">
                        <i className="fa fa-windows"></i>
                      </div>
                      <div className="icon-text">windows</div>
                    </MenuItem>
                    {this.state.showWindowsModal && (
                      <WindowsModal
                        onHide={this.closeWindowsModal}
                      />
                    )}
                  </ul>
                </div>
                {/* syslog */}
                <div className="col-md-6 select-log-type clearfix">
                  <div className="select-type-text">
                    <h3 className="select-type-name">{t('Syslog无代理方式')}</h3>
                    <ul>
                      <li>{t('无需安装任何应用')}</li>
                      <li>{t('容易配置')}</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <MenuItem  onSelect={this.rslogPage}>
                      <div className="icon-circle-setup">
                        <i className="fa fa-text">rslog</i>
                      </div>
                      <div className="icon-text">Rslog</div>
                    </MenuItem>
                    {this.state.showRslogModal && (
                      <RslogModal
                        onHide={this.closeRslogModal}
                      />
                    )}

                    <a href="javascript:;" className="disable">
                      <div className="icon-circle-setup">
                        <i className="fa fa-text">syslog-ng</i>
                      </div>
                      <div className="icon-text">Syslog-Ng</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="fa fa-text">syslogd</i>
                      </div>
                      <div className="icon-text">Syslogd</div>
                    </a>
                  </div>
                </div>
                {/* language */}
                <div className="col-md-12 select-log-type border-t-b clearfix">
                  <div className="select-type-text">
                    <h3 className="select-type-name">{t('编程语言支持')}</h3>
                    <ul>
                      <li>{t('直接从应用内部发送日志')}</li>
                      <li>{t('无需担心日志存储')}</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-node"></i>
                      </div>
                      <div className="icon-text">Nodejs</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-php"></i>
                      </div>
                      <div className="icon-text">PHP</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-python"></i>
                      </div>
                      <div className="icon-text">Python</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-ruby"></i>
                      </div>
                      <div className="icon-text">Ruby</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-java"></i>
                      </div>
                      <div className="icon-text">java</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-go"></i>
                      </div>
                      <div className="icon-text">GO</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-javascript"></i>
                      </div>
                      <div className="icon-text">javascript</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-csharp"></i>
                      </div>
                      <div className="icon-text">C#</div>
                    </a>
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="platformicon platformicon-objc"></i>
                      </div>
                      <div className="icon-text">object-c</div>
                    </a>
                  </div>
                </div>
                {/* upload */}
                <div className="col-md-6 select-log-type clearfix">
                  <div className="select-type-text">
                    <h3 className="select-type-name">{t('手工方法')}</h3>
                    <ul>
                      <li>{t('手工方法')}手工上传测试体验</li>
                      <li>{t('HTTP')}</li>
                    </ul>
                  </div>
                  <div className="select-type-icon">
                    <MenuItem  onSelect={this.uploadPage}  className="disable">
                      <div className="icon-circle-setup">
                        <i className="fa fa-upload"></i>
                      </div>
                      <div className="icon-text">{t('上传')}</div>
                    </MenuItem>
                    {this.state.showUploadModal && (
                      <UploadModal
                        onHide={this.closeUploadModal}
                      />
                    )}
                    <a href="javascript:;"  className="disable">
                      <div className="icon-circle-setup">
                        <i className="fa fa-text">http</i>
                      </div>
                      <div className="icon-text">Http</div>
                    </a>
                  </div>
                </div>
              </div>

              {/* config result */}
              <div className="hide box">
                <div className="box-header">
                  <h3>{t('配置结果')}</h3>
                </div>
                <div className="box-content with-padding">
                  <div className="section">
                    <h4>{t('配置成功')}</h4>
                    <div className="success-option start-searching">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-search"></i>
                      </a>
                      <p>
                        <span>{t('开始搜索')}</span>
                        <a href="javascript:;" className="external" target="_blank"> {t('查看搜索教程。')}</a>
                      </p>
                    </div>
                    <div className="success-option add-more-data">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-plus"></i>
                      </a>
                      <p>
                        {t('添加更多数据')}
                        <a href="javascript:;" className="external" target="_blank">
                          {t('查看添加数据教程。')}
                        </a>
                      </p>
                    </div>
                    <div className="success-option build-dashboards">
                      <a className="btn btn-success-page success-option-icon" href="javascript:;">
                        <i className="fa fa-th-large"></i>
                      </a>
                      <p>
                        {t('构建仪表板')}
                        <a href="/zh-CN/help?location=learnmore.dashboards" className="external" target="_blank">
                          {t('查看构建仪表板教程。')}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="form-actions">
                    <a href="#" className="btn btn-primary">{t('返回')}</a>
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

export default FileImportGroup;
