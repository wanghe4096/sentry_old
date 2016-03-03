import React,{PropTypes} from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import { DragSource } from 'react-dnd';
import FieldAction from 'actions/search/fieldAction';
import FieldStore from 'stores/search/fieldStore';
import SearchStore from 'stores/search/searchStore';
const css = require('css/search/field-list.less');


const _FieldItem = React.createClass({
  propTypes: {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  },
  render() {

    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <label
       style={{ opacity: isDragging ? 0.5 : 1 }}
        className="field-item">
        <span>{this.props.name}</span>
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
  mixins: [
    Reflux.connect(FieldStore,'list')
  ],
  getInitialState() {
    return {
      filter: ''
    }
  },
  componentWillMount() {
    css.use();
    FieldAction.fetch(SearchStore.get('query'),SearchStore.get('timeRange'));
  },
  componentWillUnmount() {
    css.unuse();
  },
  filterHandler(e) {
    this.setState({
      filter: e.target.value.toLocaleLowerCase().replace(/\s+/g, '')
    });
  },
  // arr: [
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  //   'http_method',
  //   'http_status',
  //   'client',
  // ],
  renderBody() {
    return this.state.list.map((data,i) => {
      const reg = new RegExp(this.state.filter);
      if(this.state.filter && !reg.test(data.name.toLocaleLowerCase())) {
        return false;
      }
      return (<FieldItem type="type" name={data.name} key={i} {...data} />)
    })
  },
  render() {
    return (
      <section className="fields_wrap">
        <div className="field-head">
          <span className="tit">Fields</span>
          <span className="fold-btn glyphicon glyphicon-menu-left"/>
        </div>
        <div
          className={`field-filter ${this.state.filter? 'active': ''}`}>
          <div className="input-group">
            <span className="glyphicon glyphicon-search input-group-addon"/>
            <input
              onChange={this.filterHandler}
              className="form-control"
              placeholder="Field Filter"/>
          </div>
        </div>
        <dl className="field-group-list">
          <dt className="field-group-tit">Default Field<b>(23)</b>
          </dt>
          <dd className="field-group">
            { this.renderBody() }
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
