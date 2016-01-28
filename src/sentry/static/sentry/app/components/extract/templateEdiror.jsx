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
import ExtractorActions from 'actions/extract/extractorActions';

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
    this.setState({
      plainValue: val
    });
  },

  componentWillUpdate(nextProps, nextState) {

    if (nextState.list !== this.state.list) {
      const val = this.getValue(nextState.list);
      this.setState({
        plainValue: val
      });
      this.codemirror.setValue(val);
    }
  },


  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.editor, {
      lineNumbers: true,
      styleActiveLine: true,
      viewportMargin: Infinity,
      value: this.state.plainValue,
      placeholder: t('Please enter Extractor Role or Run'),
      mode: "javascript",
      extraKeys: {
        'Cmd-Enter': (cm) => {
          ExtractorActions.run(this.props.streamId, this.props.action);
          ExtractorStatusActions.setRuningStatus()
        }
      }
    });

    window.codemirror = this.codemirror;

    this.codemirror.on('change', (codemirror, changeObj) => {
      var currentPlainValue = codemirror.getValue();
      this.setState({
        saveBtnActive: !!$.trim(currentPlainValue).length
      });
    });

    this.codemirror.focus();

    this.codemirror.setCursor(1);

    //this.codemirror.on('keyHandled', (codemirror, name, event) => {
    //  console.log('keyHandled:', name, event);
    //});

  },

  onStatusChange(status) {
    this.setState({
      isRuning: status.isRuning,
      isRuned: status.isRuned,
    });
  },

  getValue(list = this.state.list) {
    return list.map((templateObj) => {
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