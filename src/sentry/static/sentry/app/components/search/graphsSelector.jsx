import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import DesignerStateStore from 'stores/search/designerStateStore';
import DesignerStateAction from 'actions/search/designerStateAction';

const groupedData = _.groupBy(DesignerStateStore.getChartTypes(), (d) => {
  return d.group;
});

const CTitem = React.createClass({
  onClickHandler() {
    this.props.onClick();
  },

  render() {
    const { activeState } = this.props;
    return (
      <li
        onClick={ this.onClickHandler }
        className={`t-item-li ${activeState ? 'active': ''}`} >
        <i className="glyphicon glyphicon-align-left" />
      </li>
    )
  }
});

const GraphsSelector = React.createClass({
  mixins: [
    Reflux.listenTo(DesignerStateStore, 'onStateChange')
  ],
  getInitialState() {
    return {
      active: DesignerStateStore.get('graphType')
    }
  },
  itemSelectHandler(type) {
    DesignerStateAction.setGraphType(type);
  },
  onStateChange(data) {
    this.setState({active:data.graphType})
  },
  render() {
    return (
      <section className="type-selector">
        <div className="section-head">
          <span className="tit">Graphs Selector</span>
        </div>
        <div className="t-group">
          <p className="group-tit">Visualize</p>
          <ul className="t-list-ul clearfix">
            {
                groupedData['Visualize'].map((d, i) => {
                  return (
                    <CTitem
                      activeState={ this.state.active === d.name }
                      onClick={() => this.itemSelectHandler(d.name) }
                      key={i} {...d} />
                  )
                })
            }
          </ul>
        </div>
        <div className="t-group">
          <p className="group-tit">Timeseries Graphs</p>
          <ul className="t-list-ul clearfix">
            {
                groupedData['Timeseries Graphs'].map((d, i) => {
                  return (
                    <CTitem
                      activeState={ this.state.active === d.name }
                      onClick={() => this.itemSelectHandler(d.name) }
                      key={i} {...d} />
                  )
                })
            }
          </ul>
        </div>
      </section>
    )
  }
});

export default GraphsSelector;
