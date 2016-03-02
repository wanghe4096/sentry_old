import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import AlertActions from 'actions/alertActions.jsx';
import { DropTarget } from 'react-dnd';
import {t} from 'app/locale';

const css = require('css/search/component-designer.less');

const _TagWrap = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      // items:this.props.data || []
    }
  },
  componentWillReceiveProps() {

  },
  onClickHandler(fieldKey) {
    this.props.onRemove(fieldKey)
  },
  renderBody() {
    return this.props.data.map((data, i) => {
      return (
        <div className="tag-item" key={i} >
          { data }
          <i
            onClick={() => this.onClickHandler(data)}
            className="remove-btn fa fa-close" />
        </div>
      )
    });
  },
  render() {
    // console.log('11:',this.state.items);
    const { isOver, canDrop, connectDropTarget } = this.props;
    const isActive = isOver && canDrop;

    let className = 'tag-wrap ';
    if (isActive) {
      className += 'active';
    } else if (canDrop) {
      // className += ' can-drop'
    }
    return connectDropTarget(
      <div className={className}>
        {
          this.props.data.length ? this.renderBody(): (
            <span className="placeholder">{this.props.placeholder}</span>
          )
        }
      </div>
    )
  }
});

const TagWrap = DropTarget(props => props.accepts ,{
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
},(connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(_TagWrap);


/**
 *
 */
const Designer = React.createClass({
  getInitialState() {
    return {
      x_axis:[],
      y_axis:[]
    }
  },
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  handleDrop(axis,item) {
    let data = {};
    let stateKey = axis + '_axis';
    // console.log(this.state[stateKey])
    if(this.state[stateKey].indexOf(item.name) !== -1) {
      AlertActions.addAlert(t('Only one field per axis is allowed.'), 'error');
      return false;
    }
    data[stateKey] = _.uniq(this.state[stateKey].concat(item.name));
    this.setState(data);
  },
  removeHandler(axis,fieldKey) {
    let data = {};
    let stateKey = axis + '_axis';
    data[stateKey] = _.without(this.state[stateKey],fieldKey);
    this.setState(data);
  },
  render() {
    return (
      <div className="designer-body">
        <div className="s2-container">
          <div className="xy-axis">
            <div className="xy-row">
              <div className="row-tit">Y Axis</div>
              <TagWrap
                accepts={['type']}
                placeholder="Drag the field you want to analyze here"
                data={this.state.y_axis}
                onRemove={(fieldKey) => this.removeHandler('y',fieldKey) }
                onDrop={(item) => this.handleDrop('y',item)} />
            </div>
            <div className="xy-row">
              <div className="row-tit">X Axis</div>
              <TagWrap
                accepts={['type']}
                placeholder="Drag the field you want to group by here"
                data={this.state.x_axis}
                onRemove={(fieldKey) => this.removeHandler('x',fieldKey) }
                onDrop={(item)=>this.handleDrop('x',item)} />
            </div>
          </div>
          <div className="designer-frame">
            <div className="y-axis">
              <span className="vertical-text">Y axis</span>
            </div>
            <div className="x-axis">X axis</div>
            <div className="frame-body"></div>
          </div>
        </div>
      </div>
    )
  }
});

export default Designer;
