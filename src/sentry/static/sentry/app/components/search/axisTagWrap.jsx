import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import { DropTarget } from 'react-dnd';
import {t} from 'app/locale';
import DesignerStore from 'stores/search/designerStore';
import DesignerStateAction from 'actions/search/designerStateAction';


const _TagWrap = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  },
  onClickHandler(fieldKey) {
    this.props.onRemove(fieldKey)
  },
  renderBody() {
    return this.props.data.map((data, i) => {
      let displayName = data;
      if(this.props.axis === 'y'){
        displayName = 'Count(' + displayName + ')';
      }

      return (
        <div className="tag-item" key={i} >
          { displayName }
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
      className += ' can-drop'
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

const AxisTagWrap = React.createClass({
  mixins: [
    Reflux.connect(DesignerStore)
  ],
  handleDrop(axis,item) {
    const value = _.uniq(DesignerStore.getAxis(axis).concat(item.name));
    DesignerStateAction.setAxisValue(axis,value);
  },
  removeHandler(axis,fieldKey) {
    const value = _.without(DesignerStore.getAxis(axis),fieldKey);
    DesignerStateAction.setAxisValue(axis,value);
  },
  render() {
    return (
      <div className="xy-axis">
        <div className="xy-row">
          <div className="row-tit">Y Axis</div>
          <TagWrap
            accepts={['type']}
            placeholder="Drag the field you want to analyze here"
            data={this.state.y_axis}
            axis="y"
            onRemove={(fieldKey) => this.removeHandler('y',fieldKey) }
            onDrop={(item) => this.handleDrop('y',item)} />
        </div>
        <div className="xy-row">
          <div className="row-tit">X Axis</div>
          <TagWrap
            accepts={['type']}
            placeholder="Drag the field you want to group by here"
            data={this.state.x_axis}
            axis="x"
            onRemove={(fieldKey) => this.removeHandler('x',fieldKey) }
            onDrop={(item)=>this.handleDrop('x',item)} />
        </div>
      </div>
    )
  }
});

export default AxisTagWrap;
