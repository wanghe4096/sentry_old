import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import { DropTarget } from 'react-dnd';

const css = require('css/search/component-designer.less');

const _TagWrap = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func.isRequired
  },
    render() {
      const { isOver, canDrop, connectDropTarget } = this.props;
      const isActive = isOver && canDrop;

      let borderColor = '#ccc';
      if (isActive) {
        borderColor = 'darkgreen';
      } else if (canDrop) {
        borderColor = 'darkkhaki';
      }
      return connectDropTarget(
        <div style={{borderColor}} className="tag-wrap"></div>
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

const Designer = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  handleDrop(axis,item) {
    console.log('handleDrop:['+axis+']', item.name);
  },
  render() {
    return (
      <div className="designer-body">
        <div className="s2-container">
          <div className="xy-axis">
            <div className="xy-row">
              <div className="row-tit">Y Axis</div>
              <TagWrap accepts={['type']} onDrop={(item)=>this.handleDrop('y',item)} />
            </div>
            <div className="xy-row">
              <div className="row-tit">X Axis</div>
              <TagWrap accepts={['type']} onDrop={(item)=>this.handleDrop('x',item)} />
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
