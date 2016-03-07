import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import _ from 'underscore';

const Pane = React.createClass({
  getDefaultProps() {
    return {
      maxLen: 30
    }
  },
  getInitialState() {
    return {
      inBottom: true,
      grep:null,
      arr: []
    }
  },
  componentWillMount() {
    let i = 0;
    let arr = [];
    while(i<10){
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
    },500);

    $(this.refs.body).scroll(() => {
      const messagesHeight = this.refs.messages.scrollHeight;
      const bodyHeight = this.refs.body.clientHeight;
      const bodyScrollTop = this.refs.body.scrollTop;
      this.setState({
        inBottom: bodyHeight + bodyScrollTop === messagesHeight
      })
    });
  },
  componentDidUpdate() {
    // 滚动条在最底部的时候才执行
    if(this.state.inBottom){
      $(this.refs.body).scrollTop(90000000);
    }
    const arrLen = this.state.arr.length;
    if(arrLen > this.props.maxLen ){
      this.setState({
        arr: this.state.arr.slice(1)
      });
    }
  },
  renderBody() {
    window.xx = this;
    return this.state.arr.map((a, i) => {

      let text = a;
      if(this.state.grep) {
        const reg = new RegExp(this.state.grep, 'gi');
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
        <div className="pane-head">
          <span className="pane-head">pane head</span>
          <i className="close-btn fa fa-close" />
        </div>
        <div className="pane-body" ref="body">
          <div className="message-list" ref="messages">
            { this.renderBody() }
          </div>
        </div>
      </div>
    )
  }
});

export default Pane;
