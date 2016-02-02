/**
 * Title: configStore.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import Reflux from 'reflux';
import ExtractorConfigActions from 'actions/extract/extractorConfigActions';
import _ from 'underscore';

const ExtractorConfigStore = Reflux.createStore({
  listenables: ExtractorConfigActions,

  config: {},

  init() {

  },

  onFetchSuccess(config) {
    this.config = config;
    this.trigger(this.config);
  },

  onFetchFailed(e) {
    console.log('fetch err:', e);
  }
});

export default ExtractorConfigStore;