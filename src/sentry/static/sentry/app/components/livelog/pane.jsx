import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import _ from 'underscore';
import {Modal} from 'react-bootstrap';

const PaneModal = React.createClass({
  render() {
    return (
      <Modal show={true} keyboard={true} onHide={this.props.onHide} dialogClassName="custom-modal">
        <Modal.Header closeButton={true}>
          <Modal.Title>{t('linux配置')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitHandler} className="form-horizontal">
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
          </form>
        </Modal.Body>
      </Modal>
    )
  }
});

const Pane = React.createClass({
  getDefaultProps() {
    return {
      maxLen: 50
    }
  },
  getInitialState() {
    return {
      inBottom: true,
      grep:null,
      arr: [],
      streamIds: ['name','xs'],
      hostIds: [],
      selectHostModal: false,
      selectStreamModal: false
    }
  },
  componentWillMount() {
    let i = 0;
    let arr = [];
    while(i < 30){
      arr.push('17.235.36.254 - - [07/Mar/2016:06:34:57 +0000] "GET /logio.v4.js HTTP/1.1" 200 1799 "http://logio.org/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:46.0) Gecko/20100101 Firefox/46.0"');
      i++;
    }
    this.setState({
      arr:arr
    })
  },
  componentDidMount() {
    setInterval(() => {
      this.setState({
        arr:this.state.arr.concat(_.random(0,255)+'.235.36.254 - - [07/Mar/2016:06:34:57 +0000] "GET /logio.v4.js HTTP/1.1" 200 1799 "http://logio.org/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:46.0) Gecko/20100101 Firefox/46.0"')
      })
    },2000);

    $(this.refs.body).scroll(() => {
      const messagesHeight = this.refs.messages.scrollHeight;
      const bodyHeight = this.refs.body.clientHeight;
      const bodyScrollTop = this.refs.body.scrollTop;
      this.setState({
        inBottom: bodyHeight + bodyScrollTop === messagesHeight
      })
    });

    // $(this.refs.splitBtn).tooltip();
  },
  componentWillUpdate() {
    const arrLen = this.state.arr.length;
    if(arrLen > this.props.maxLen ) {
      this.setState({
        arr: this.state.arr.slice(1)
      });
    }
  },
  componentDidUpdate() {
    // 滚动条在最底部的时候才执行
    if(this.state.inBottom){
      $(this.refs.body).scrollTop(90000000);
    }

  },
  onFilterChange(e) {
    this.setState({
      grep: e.target.value
    })
  },
  renderBody() {
    // TODO 此处为了性能考虑，最好用 __html的方式，append 和 delete children[0]来实现
    window.xx = this;
    return this.state.arr.map((a, i) => {

      let text = a;
      const reg = new RegExp(this.state.grep, 'gi');
      if(this.state.grep && !reg.test(text)){
        return null;
      }
      if(this.state.grep) {
        text = a.replace(reg, (word) => {
          return '<a class="highlight">'+ this.state.grep +'</a>'
        });
      }
      text = i + ': ' + text;
      return(
        <div className="message" dangerouslySetInnerHTML={{__html:text}} key={i}>
        </div>
      )
    });
  },
  render() {
    return (
      <div className="ll-pane active">
        {
          this.state.selectHostModal && (
            <PaneModal
              onHide={() => {
                this.setState({
                  selectHostModal: false
                })
              }} />
          )
        }
        {
          this.state.selectStreamModal && (
            <PaneModal
              onHide={() => {
                this.setState({
                  selectStreamModal: false
                })
              }} />
          )
        }
        <div className="pane-head">
          <span className="pane-tit hide">pane head</span>
          <i className="close-btn fa fa-close" />
          <div className="selector-wrap">
            <div
              onClick={() => {
                this.setState({
                  selectHostModal: true
                })
              }}
              className="selector host-select">
              <span className="t-key">
                {t('Host')}:
              </span>
              {
                this.state.hostIds.length ? (
                  <span className="t-val">
                    {this.state.hostIds[0]} ...
                    {
                      this.state.hostIds.length > 1 && (
                          <sup>{this.state.hostIds.length}</sup>
                      )
                    }
                    <i className="fa fa-chevron-down" />
                  </span>
                ):(
                  <span className="t-val">
                    All <i className="fa fa-chevron-down" />
                  </span>
                )
              }
            </div>
            <div
              onClick={() => {
                this.setState({
                  selectStreamModal: true
                })
              }}
              className="selector stream-select">
              <span className="t-key">
                {t('Stream')}:
              </span>
              {
                this.state.streamIds.length ? (
                  <span className="t-val">
                    {this.state.streamIds[0]} ...
                    {
                      this.state.streamIds.length > 1 && (
                          <sup>{this.state.streamIds.length}</sup>
                      )
                    }
                    <i className="fa fa-chevron-down" />
                  </span>
                ): (
                  <span className="t-val">
                    All <i className="fa fa-chevron-down" />
                  </span>
                )
              }

            </div>
          </div>
        </div>
        <div className="pane-body" ref="body">
          <div className="message-list" ref="messages">
            { this.renderBody() }
          </div>
        </div>
        <div className="control-group">
          <i ref="splitBtn" className="split-column fa fa-columns" data-toggle="tooltip" data-placement="top" title="Split Pane Vertically" />
          <i className="split-row fa fa-columns" data-toggle="tooltip" data-placement="top" title="Split Pane Horizontally" />
        </div>
        <div className="filter-panel">
          <div className="input-group input-group-sm">
              <input
                onChange={this.onFilterChange}
                placeholder="Filter"
                className="grep-input form-control" />
              <div className="input-group-addon hide">
                <i className="fa fa-chevron-up" />
                <i className="fa fa-chevron-down" />
              </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Pane;
