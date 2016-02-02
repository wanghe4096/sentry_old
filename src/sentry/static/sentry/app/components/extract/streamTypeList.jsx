/**
 * Title: streamTypeList.jsx
 * Author: bold
 * Date: 1/29/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import async from 'async';
import {Link} from 'react-router';
import {t} from 'app/locale';
import _ from 'underscore';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';

import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';
import AlertActions from 'actions/alertActions';


const StreamTypeItem = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    return (
      <li className="stream-type-item">
        <div className="stream-type-name">{this.props.name}</div>
        <div className="stream-type-action">
          <div className="btn-group btn-group-sm btn-save clearfix">
            <button type="button" className="btn btn-default" onClick={this.saveHandler}>
              {t('Structure')}
            </button>
            <button
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret"/>
            </button>
            <ul className="dropdown-menu-right dropdown-menu">
              <li><a>{t('Structure')}</a></li>
              <li><a>{t('Reg')}</a></li>
              <li><a>{t('Groker')}</a></li>
            </ul>
          </div>
        </div>
      </li>
    )
  }
});


const StreamTypeList = React.createClass({

  getInitialState() {
    return {
      list: [
        {
          id: '0000001',
          name: 'xxxxx',
          actions: [
            'stracture',
            'reg',
            'gorker'
          ]
        },
        {
          id: '0000002',
          name: 'xxxxx',
          actions: [
            'stracture',
            'reg',
            'gorker'
          ]
        }
      ]
    }
  },

  renderList() {
    return this.state.list.map((item, i) => {
      return (<StreamTypeItem key={i} {...item}/>)
    });
  },

  render() {
    return (
      <div>

        <div className="filter-wrap">

        </div>
        <ul className="stream-type-list">
          { this.renderList() }
        </ul>

      </div>
    )
  }

});

export default StreamTypeList;