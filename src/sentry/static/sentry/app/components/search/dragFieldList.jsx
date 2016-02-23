import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import { DragSource } from 'react-dnd';
const css = require('css/search/field-list.less');


const _FieldItem = React.createClass({
  propTypes: {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  },
  render() {

    const { isDragging, connectDragSource, name } = this.props;

    return connectDragSource(
      <label
       style={{ opacity: isDragging ? 0.5 : 1 }}
        className="field-item">
        <span>{name}</span>
      </label>
    )
  }
});

const FieldItem = DragSource(props => props.type, {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
}, (connect,monitor) => ({
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
  }))(_FieldItem);


const FieldList = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
  arr: [
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
    'http_method',
    'http_status',
    'client',
  ],
  render() {
    return (
      <section className="fields_wrap">
        <div className="field-head">
          <span className="tit">Fields</span>
          <span className="fold-btn glyphicon glyphicon-menu-left"/>
        </div>
        <div className="field-filter">
          <div className="input-group">
            <span className="glyphicon glyphicon-search input-group-addon"/>
            <input className="form-control" placeholder="Field Filter"/>
          </div>
        </div>
        <dl className="field-group-list">
          <dt className="field-group-tit">Default Field<b>(23)</b>
          </dt>
          <dd className="field-group">
            {
                this.arr.map((n,i) => {
                  return <FieldItem key={i} type="type" name={n} />
                })
            }
          </dd>
          <dt className="field-group-tit">Custom Field<b>(23)</b>
          </dt>
          <dd className="field-group">
            <label className="field-item"><input type="checkbox"/>host</label>
            <label className="field-item"><input type="checkbox"/>client_ip</label>
          </dd>
        </dl>
      </section>
    )
  }
});

export default FieldList;
