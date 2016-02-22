import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

const css = require('css/search/field-list.less');

const FieldList = React.createClass({
  componentWillMount() {
    css.use();
  },
  componentWillUnmount() {
    css.unuse();
  },
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
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
            <label className="field-item"><input type="checkbox"/>http_method</label>
            <label className="field-item"><input type="checkbox"/>http_status</label>
            <label className="field-item"><input type="checkbox"/>client</label>
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
