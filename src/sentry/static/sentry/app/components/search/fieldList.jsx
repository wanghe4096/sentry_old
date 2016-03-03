import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import FieldStore from 'stores/search/fieldStore';
import FieldAction from 'actions/search/fieldAction';
import SearchStore from 'stores/search/searchStore';
const css = require('css/search/field-list.less');

const FieldItem = React.createClass({
  onChangeHandler(e) {
    console.log(e.target.checked)
  },
  render() {
    return (
      <label className="field-item">
        <input
          type="checkbox"
          disabled
          checked={ this.props.default_selected }
          onChange={this.onChangeHandler} />
        { this.props.name }
      </label>
    )
  }
});

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

  renderBody() {
    return this.state.list.map((data,i) => {
      const reg = new RegExp(this.state.filter);
      if(this.state.filter && !reg.test(data.name.toLocaleLowerCase())) {
        return false;
      }
      return (<FieldItem key={i} {...data} />)
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
              className="form-control"
              onChange={this.filterHandler}
              placeholder="Field Filter"/>
          </div>
        </div>
        <div className="field-group-list">
          <div className="field-group-item">
            <div className="field-group-tit">Default Field<b>(23)</b></div>
            <div className="field-group">
              { this.renderBody() }
            </div>
          </div>
        </div>
      </section>
    )
  }
});

export default FieldList;
