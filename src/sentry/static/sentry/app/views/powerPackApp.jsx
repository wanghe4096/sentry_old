import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import Pane from 'components/livelog/pane';

const style = require('css/powerPack.less');

const PowerPackApp = React.createClass({
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
      <DocumentTitle title="PowerPack">
        <div className="po-pack">
          {this.state.click?
          <div className="col-md-12">
            <div className="pack-header text-center hide">
              <span className="logo">
                <img src={`/_static/sentry/images/logo-white.png`} />
                <span>
                  {t('增强版')}
                </span>
              </span>
            </div>
            <div className="pack-nav clearfix">
              <div className="col-md-3 text-center">
                <ul>
                  <li>
                    <img src={`/_static/sentry/images/po-search.png`} />
                  </li>
                  <li>
                    <span>
                      {t('搜索分析')}
                    </span>
                  </li>
                  <li>
                    <p>
                      {t('强大的搜索分析功能，快速定位问题')}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 text-center">
                <ul>
                  <li>
                    <img src={`/_static/sentry/images/po-dashboard.png`} />
                  </li>
                  <li>
                    <span>
                      {t('仪表盘')}
                    </span>
                  </li>
                  <li>
                    <p>
                      {t('快速创建各种统计视图，以及个性化仪表盘')}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 text-center">
                <ul>
                  <li>
                    <img src={`/_static/sentry/images/po-visual.png`} />
                  </li>
                  <li>
                    <span>
                      {t('可视化')}
                    </span>
                  </li>
                  <li>
                    <p>
                      {t('数据一目了然，放大数据价值')}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 text-center">
                <ul>
                  <li>
                    <img src={`/_static/sentry/images/po-addlog.png`} />
                  </li>
                  <li>
                    <span>
                      {t('上传日志')}
                    </span>
                  </li>
                  <li>
                    <p>
                      {t('Rsyslog接入，更方便。Agent接入，功能更强大。')}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pack-content">
              <div className="content-info clearfix">
                <div className="col-md-7">
                  <img src={`/_static/sentry/images/search-desc.png`} />
                </div>
                <div className="col-md-5">
                  <ul>
                    <li>
                      <h2>
                        {t('日志搜索功能')}
                      </h2>
                      <span>
                        {t('实时搜索，快速定位问题')}
                      </span>
                      <span className="pack-line"></span>
                    </li>
                    <li>
                    </li>
                    <li>
                      <ul>
                        <li>
                          {t('强大的搜索分析功能，保存搜索结果;')}
                        </li>
                        <li>
                          {t('自动解析日志，字段值过滤;')}
                        </li>
                        <li>
                          {t('将无序数据转化为有序。')}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-info clearfix">
                <div className="col-md-5">
                  <ul>
                    <li>
                      <h2>
                        {t('自定义仪表盘')}
                      </h2>
                      <span>
                        {t('多样化数据展示方式')}
                      </span>
                      <span className="pack-line"></span>
                    </li>
                    <li>
                    </li>
                    <li>
                      <ul>
                        <li>
                          {t('让重要的东西只需一次点击;')}
                        </li>
                        <li>
                          {t('方便共享数据给同事、经理，甚至销售和市场部门;')}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-md-7">
                  <img src={`/_static/sentry/images/visual-desc.png`} />
                </div>
              </div>
              <div className="content-info clearfix">
                <div className="col-md-7">
                  <img src={`/_static/sentry/images/search-desc.png`} />
                </div>
                <div className="col-md-5">
                  <ul>
                    <li>
                      <h2>
                        {t('数据可视化')}
                      </h2>
                      <span>
                        {t('数据清晰可见，一目了然')}
                      </span>
                      <span className="pack-line"></span>
                    </li>
                    <li>
                    </li>
                    <li>
                      <ul>
                        <li>
                          {t('放大数据价值;')}
                        </li>
                        <li>
                          {t('实现多种数据对比;')}
                        </li>
                        <li>
                          {t('用户快速得到大量信息。')}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-info clearfix">
                <div className="col-md-5">
                  <ul>
                    <li>
                      <h2>
                        {t('多种日志上传方式')}
                      </h2>
                      <span>
                        {t('简单易用、支持所有常用语言')}
                      </span>
                      <span className="pack-line"></span>
                    </li>
                    <li>
                    </li>
                    <li>
                      <ul>
                        <li>
                          {t('Agent方式：实时采集，无数据丢失，一键安装，自动接入;')}
                        </li>
                        <li>
                          {t('Syslog无代理方式：无需安装任何应用;')}
                        </li>
                        <li>
                          {t('编程语言支持：直接从应用内部发送日志，无需担心日志存储;')}
                        </li>
                        <li>
                          {t('手工上传')}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-md-7">
                  <img src={`/_static/sentry/images/visual-desc.png`} />
                </div>
              </div>
            </div>
            <div className="pack-footer text-center">
              <a href="javascript:0" onClick={this.handleClick}>
                {t('申请试用')}
              </a>
            </div>
          </div>
          :
          <div className="col-md-12">
            <div className="pack-nav text-center">
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="pack-version">
                  <div className="price-color"></div>
                  <h3>
                    {t('普及版')}
                  </h3>
                  <h1>
                    {t('免费')}
                  </h1>
                  <ul>
                    <li>
                      {t('可以存储数据及导出')}
                    </li>
                    <li>
                      {t('可以搜索日志，定制仪表盘')}
                    </li>
                  </ul>
                  <a href="javascript:0;">
                    {t('申请试用')}
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="pack-version">
                  <div className="price-color price-info"></div>
                  <h3>
                    {t('专业版')}
                  </h3>
                  <h1>
                    {t('待定')}
                  </h1>
                  <ul>
                    <li>
                      {t('可以存储数据及导出')}
                    </li>
                    <li>
                      {t('可以搜索日志，定制仪表盘')}
                    </li>
                    <li>
                      {t('可以实时告警')}
                    </li>
                  </ul>
                  <a href="javascript:0;">
                    {t('申请试用')}
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="pack-version">
                  <div className="price-color price-purple"></div>
                  <h3>
                    {t('企业版')}
                  </h3>
                  <h1>
                    {t('待定')}
                  </h1>
                  <ul>
                    <li>
                      {t('可以存储数据及导出')}
                    </li>
                    <li>
                      {t('可以搜索日志，定制仪表盘')}
                    </li>
                    <li>
                      {t('可以实时告警')}
                    </li>
                    <li>
                      {t('可以定制业务')}
                    </li>
                  </ul>
                  <a href="javascript:0;">
                    {t('申请试用')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </DocumentTitle>
    )
  }
});

export default PowerPackApp;
