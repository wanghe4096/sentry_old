/**
 * Title: extractorTemplateStore.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: Reflux Store File。
 */

import Reflux from 'reflux';
import ExtractorActions from 'actions/extract/extractorActions';
import _ from 'underscore';

const ExtractorTemplateStore = Reflux.createStore({
  listenables: ExtractorActions,

  items: [],

  init() {

  },

  onRunSuccess(items) {
    this.items = items;
    this.trigger(this.items);
  },

  onRunFailed(e) {
    console.log('fetch err:', e);
  }
});

export default ExtractorTemplateStore;