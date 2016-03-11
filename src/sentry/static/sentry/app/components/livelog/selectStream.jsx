import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import {t} from 'app/locale';
import HostAction from 'actions/livelog/hostAction';
import HostStore from 'stores/livelog/hostStore';
import StreamAction from 'actions/livelog/streamAction';
import StreamStore from 'stores/livelog/streamStore';
import {Modal} from 'react-bootstrap';

const SelectStream = React.createClass({
  propTypes: {
    onHide: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  mixins: [
    Reflux.connect(HostStore, 'hostList'),
    Reflux.connect(StreamStore, 'streamList')
  ],
  getInitialState() {
    return {
      activeHost: null,
      selectedItems: this.props.defaultItems || []
    }
  },
  renderEmpty() {
    return (
      <center style={{marginTop:30}}>Loading ...</center>
    )
  },

  onSelectHost(id,e) {
    this.setState({
      activeHost: id
    });

    StreamAction.fetch(id);

  },

  onSelectStream(streamId,e) {
    let list ;
    const _index = this.state.selectedItems.indexOf(streamId)
    if(_index !== -1) {
      list = _.clone(this.state.selectedItems);
      list.splice(_index, 1);
    }else{
      list = this.state.selectedItems.concat(streamId);
    }

    this.setState({
      selectedItems: list
    });
  },

  onSubmit() {
    this.props.onSubmit(this.state.selectedItems);
    this.props.onHide()
  },

  renderStream() {
    if(!this.state.activeHost) {
      return (<div className="notice">please select host.</div>)
    }

    let streamList = this.state.streamList;

    if(!streamList.length){
      return (<div className="notice">loading or not item</div>)
    }else{
      return streamList.map((x, i) => {
        const isSelected = this.state.selectedItems.indexOf(x.id) !== -1;
        return (
          <li
            className={`stream-item ${isSelected ? 'selected' : ''}`}
            onClick={(e) => this.onSelectStream(x.id)}
            key={i} >
            {
              isSelected ? (
                <i className="fa fa-check-square-o" />
              ) : (
                <i className="fa fa-square-o" />
              )
            }
            { x.id }
          </li>
        )
      });
    }
  },

  renderBody() {

    if (HostStore.status.fetching) {
      return this.renderEmpty();
    }

    const groupedHostData = _.groupBy(this.state.hostList,(d) => { return d.host_type });

    return (
      <div className="selector-wrap clearfix">
        <div className="host-group-list" role="tablist">
          {
            _.keys(groupedHostData).map((k, i) => {
                return (
                  <li key={i} className="host-group-item">
                    <div className="host-group-head">{k}</div>
                    <ul className="host-list">
                      {
                        groupedHostData[k].map((d,_i) => {
                          const isActive = this.state.activeHost === d.id ;
                          return (
                            <li
                              className={`host-item ${isActive ? 'active' : ''}`}
                              key={_i}
                              onClick={(e) => this.onSelectHost(d.id,e)}>
                              {d.host_name}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                )
            })
          }
        </div>
        <div className="stream-list">
          { this.renderStream() }
        </div>
      </div>
    );
  },
  render() {
    return (
      <Modal show={true} keyboard={true} onHide={this.props.onHide} dialogClassName="selector-modal">
        <Modal.Header closeButton={true}>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="selected-stream">
            <div className="sec-tit">{t('selected items')}:</div>
            <ul className="item-list clearfix">
              {
                this.state.selectedItems.map((s,i) => {
                  return (
                    <li className="item" key={i}>
                      {s}
                      <i
                        onClick={ (e) => this.onSelectStream(s,e) }
                        className="fa fa-close" />
                    </li>
                  )
                })
              }
            </ul>
          </div>
          { this.renderBody() }
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={this.onSubmit}
            className="btn btn-sm btn-primary">Apply</button>
          <button
            onClick={this.props.onHide}
            className="btn btn-sm btn-default">Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
});

export default SelectStream;
