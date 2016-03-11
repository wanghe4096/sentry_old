import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import {t} from 'app/locale';
import _ from 'underscore';
import HostAction from 'actions/livelog/hostAction';
import HostStore from 'stores/livelog/hostStore';
import StreamAction from 'actions/livelog/streamAction';
import StreamStore from 'stores/livelog/streamStore';
import SelectStream from 'components/livelog/selectStream';
import EventStore from 'stores/livelog/eventStore';

const Pane = React.createClass({
  mixins:[
    Reflux.listenTo(EventStore, 'onEvent')
  ],
  getDefaultProps() {
    return {
      maxLen: 150
    }
  },
  getInitialState() {
    return {
      inBottom: true,
      grep: null,
      arr: [],
      streamIds: [],
      selectStreamModal: false
    }
  },
  componentDidMount() {
    $(this.refs.body).scroll(() => {
      const messagesHeight = this.refs.messages.scrollHeight;
      const bodyHeight = this.refs.body.clientHeight;
      const bodyScrollTop = this.refs.body.scrollTop;
      console.log('scroll:',bodyHeight + bodyScrollTop === messagesHeight);
      this.setState({
        inBottom: bodyHeight + bodyScrollTop === messagesHeight
      })
    });
  },
  componentWillUpdate(nextProps, nextState) {

    if(nextState.streamIds !== this.state.streamIds) {
      this.props.onChannelChange(nextState.streamIds);
    }

    const arrLen = this.state.arr.length;
    if(arrLen > this.props.maxLen ) {
      this.setState({
        arr: this.state.arr.slice(1)
      });
    }
  },
  componentDidUpdate() {
    // 滚动条在最底部的时候才执行
    if(this.state.inBottom) {
      $(this.refs.body).scrollTop(90000000);
    }

  },
  onEvent(event) {
    // TODO 此处应该为 obj 过滤只符合 StreamIds 的才会set到state.arr
    this.setState({
      arr: this.state.arr.concat(event)
    })
  },
  onFilterChange(e) {
    this.setState({
      grep: e.target.value
    })
  },
  onStreamChange(streamList) {
    this.setState({ streamIds: streamList })
  },
  renderBody() {
    // TODO 此处为了性能考虑，最好用 __html的方式，append 和 delete children[0]来实现
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
      // console.log('length:',text.split(/\r\n/).length)
      // text.replace(/\r\n/,'<br>');
      // text = i + ': ' + text;
      return(
        <div className="message" dangerouslySetInnerHTML={{__html:text}} key={i} />
      )
    });
  },
  render() {
    return (
      <div className="ll-pane active">
        {
          this.state.selectStreamModal && (
            <SelectStream
              title={t('Select Stream')}
              defaultItems={this.state.streamIds}
              onSubmit={this.onStreamChange}
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
                  selectStreamModal: true
                })
              }}
              className="selector stream-select">
              <span className="t-key">
                {t('Stream Filter')}:
              </span>
              {
                this.state.streamIds.length ? (
                  <span className="t-val">
                    {this.state.streamIds[0]} ...
                    {
                      this.state.streamIds.length > 1 && (
                          <span className='count'>{this.state.streamIds.length}</span>
                      )
                    }
                  </span>
                ): (
                  <span className="t-val">
                    {t('please select ...')}
                  </span>
                )
              }

            </div>
          </div>
        </div>
        <div className="pane-body" ref="body">
          {
            this.state.streamIds.length ? (
              <div className="message-list" ref="messages">
                { this.renderBody() }
              </div>
            ) : (
              <div
                className="body-empty-notice"
                onClick={() => this.setState({ selectStreamModal:true }) }
                >Select stream</div>
            )
          }
        </div>
        <div className="control-group hide">
          <i ref="splitBtn" className="split-column fa fa-columns" data-toggle="tooltip" data-placement="top" title="Split Pane Vertically" />
          <i className="split-row fa fa-columns" data-toggle="tooltip" data-placement="top" title="Split Pane Horizontally" />
        </div>
        <div className={`filter-panel ${this.state.streamIds.length?'':'hide'}`}>
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
