/**
 * Title: structureTemplate.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';
import StructureTemplateItem from 'components/extract/structureTemplateItem'

import ExtractorTemplateStore from 'stores/extract/extractorTemplateStore';


const StructureTemplateList = React.createClass({
  mixins: [
    Reflux.connect(ExtractorTemplateStore, 'list'),
    Reflux.listenTo(ExtractorTemplateStore, 'onTemplateChange')
  ],

  getInitialState() {
    return {
      loading: true,
      list: []
    }
  },

  onTemplateChange() {
    this.setState({
      loading: false
    })
  },

  renderBody() {

    return this.state.list.map((template, i) => {
      return (
        <StructureTemplateItem {...template} key={i}/>
      )
    });

  },

  render() {

    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      )
    }

    return (
      <div className="structure-template">
        <div className="result-head">
          <h4>stuctor template list:{this.state.list.length}</h4>
        </div>
        <div className="template-list">
          { this.renderBody() }
        </div>
      </div>
    )
  }
});

export default StructureTemplateList;