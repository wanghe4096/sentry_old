/**
 * Title: structureTemplateItem.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';

const StructureTemplateItem = React.createClass({
  getInitialState() {
    return {}
  },

  renderEvents() {
    return this.props.events.map((event, i) => {
      return (
        <li className="event-item" key={i}>
          { String.raw`${event}` }
        </li>
      )
    });
  },

  onChangeHandler() {
    console.log('on change');
  },

  render() {
    return (
      <div className="template-item">
        <div className="template-editor">
          <textarea onChange={this.onChangeHandler} value={ this.props.template }></textarea>
        </div>
        <div className="template-info">
          <ul className="matched_events">
            { this.renderEvents() }
          </ul>
        </div>
      </div>
    )
  }
});

export default StructureTemplateItem;