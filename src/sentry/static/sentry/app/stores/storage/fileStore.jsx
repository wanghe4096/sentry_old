/**
 * Title: fileStore.jsx
 * Author: bold
 * Date: 1/13/16.
 * Description: 。
 */

import Reflux from 'reflux';
import FileAction from 'actions/storage/fileAction';
import _ from 'underscore';

const FileStore = Reflux.createStore({
  listenables: FileAction,

  items: [],

  init() {

  },

  onFetchSuccess(items) {
    this.items = items;
    this.trigger(items);
  },

  onFetchFailed(e) {
    console.error('fetch err:', e);
  },

  getAll() {
    return this.items;
  },

  getById(fileId) {
    return _.find(this.items, (item) => item.file_id === fileId);
  }

});

export default FileStore;