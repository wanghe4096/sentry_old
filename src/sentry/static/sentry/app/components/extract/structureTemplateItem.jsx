/**
 * Title: structureTemplateItem.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import CodeMirror from 'codemirror';

const StructureTemplateItem = React.createClass({
  getInitialState() {
    return {
      folded: true
    }
  },

  componentDidMount() {
    !this.state.folded && this.initCodemirror();
  },

  componentDidUpdate() {
    !this.state.folded && this.initCodemirror();
  },

  initCodemirror() {
    this.codemirror = CodeMirror.fromTextArea(this.refs.textarea, {
      lineNumbers: true,
      //lineWrapping:true,
      readOnly: 'nocursor',
      styleActiveLine: true,
      viewportMargin: Infinity,
      mode: "javascript"
    });
  },

  toggleFoldHandler() {
    this.setState({
      folded: !this.state.folded
    })
  },

  render() {
    const events = this.props.events.join('\n');

    return (
      <div className={`template-item ${!this.state.folded && 'unfold'}`}>
        <div className="template-val" onClick={this.toggleFoldHandler}>
          <i className="fold-icon"/>
          <div className="text">{this.props.template }</div>
        </div>
        {
          !this.state.folded && (
            <div className="template-info">
              <textarea ref="textarea" className="matched_events" value={ events } readOnly/>
            </div>
          )
        }
      </div>
    )
  }
});

export default StructureTemplateItem;