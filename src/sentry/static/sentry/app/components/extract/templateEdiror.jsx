/**
 * Title: templateEdiror.jsx
 * Author: bold
 * Date: 1/25/16.
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
import CodeMirror from 'codemirror';

import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore';
import ExtractorStatus from 'stores/extract/extractorStatusStore';
import ExtractorStatusActions from 'actions/extract/extractorStatusActions';

const TemplateEdiror = React.createClass({
  mixins: [
    Reflux.connect(ExtractorTemplateStore, 'list'),
    Reflux.listenTo(ExtractorStatus, 'onStatusChange')
  ],

  getInitialState() {
    window.xx = this;
    return {
      isRuning: false,
      isRuned: false,
      plainValue: '',
      saveBtnActive: false,
      //list: [],
      list: [
        {
          template: 'xxx|www|Wwww|Wwww|Wwww|wwww',
          events: [
            ['111111', '2222']
          ]
        }
      ]
    }
  },

  componentWillMount() {

    // todo: 疑问!!! 不管是否运行过,editor 内不应该显示之前的规则?
    //ExtractorTemplateStore.fetch();
    const val = this.getValue();
    console.log('init val:', val);
    this.setState({
      plainValue: val
    });
  },

  //shouldComponentUpdate(){
  //
  //},

  componentWillUpdate(nextProps, nextState) {
    const val = this.getValue();
    if (nextState.list !== this.state.list) {
      console.log('!important list changed');
      this.setState({
        plainValue: val
      })
    }else{
      console.log('!importantk,list not changed');
    }
    console.log('componentWillUpdate:', val);
  },

  componentDidUpdate() {
    if (this.codemirror) {
      this.codemirror.setValue(this.state.plainValue);
    }
  },

  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.editor, {
      lineNumbers: true,
      styleActiveLine: true,
      viewportMargin: Infinity,
      value: this.state.plainValue,
      placeholder: t('Please enter Extractor Role'),
      mode: "javascript"
    });

    //CodeMirror.signal('change',function(){
    //  console.log(arguments);
    //})
    this.codemirror.on('change', (codemirror, changeObj) => {
      if (['paste', 'cut', '+input', '+delete'].indexOf(changeObj.origin) !== -1) {
        var currentPlainValue = codemirror.getValue();
        console.log('change +input && +remove:', changeObj.origin, currentPlainValue);
        //console.log(currentPlainValue !== this.state.plainValue, this.state.plainValue, changeObj);
        this.setState({
          saveBtnActive: currentPlainValue !== this.state.plainValue
        })
      } else {
        console.log('\n !!!!unknown changeObj:', changeObj.origin);
        return 'xxx';

      }

      //console.log(currentPlainValue);
    });
  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning,
      isRuned: status.isRuned,
    });
  },

  getValue() {
    return this.state.list.map((templateObj) => {
      return templateObj.template;
    }).join('\n');
  },

  saveHandler() {
    if (!this.state.isRuned) {
      return false;
    }
    const plainValue = this.codemirror.getValue();
    let values = plainValue.split('\n');
    console.log(values);
  },

  render (){

    let btnStatusClass = 'btn-disabled';
    if (this.state.saveBtnActive || this.state.isRuned) {
      btnStatusClass = 'btn-default';
    }

    return (
      <div className="template-editor">
        <div ref="editor" className="editor"></div>
        <div className="control-btn pull-right">
          <a className={`btn btn-save btn-sm ${btnStatusClass}`} onClick={this.saveHandler}>
            {t('Save template')}
          </a>
        </div>
      </div>
    )
  }
});

export default TemplateEdiror;