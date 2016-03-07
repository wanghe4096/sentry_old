import Reflux from 'reflux';
import IndexActions from '../actions/indexActions';

const IndexStore = Reflux.createStore({
  init() {
    this.items = [];

    this.listenTo(IndexActions.updateSuccess, this.onUpdateSuccess);
  },

  reset() {
    this.items = [];
  },

  loadInitialData(items) {
    this.items = items;
    this.trigger(this.items, 'initial');
  },

  onUpdateSuccess(changeId, itemId, response) {
    if (!response) {
      return;
    }
    let item = this.getBySlug(itemId);
    if (!item) {
      this.items.push(response);
    } else {
      $.extend(true, item, response);
    }
    this.trigger(this.items, 'update');
    console.log(changeId, itemId, response)
  },

  getById(id) {
    id = '' + id;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i];
      }
    }
    return null;
  },

  getBySlug(slug) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].slug === slug) {
        return this.items[i];
      }
    }
    return null;
  },

  getActive() {
    return this.items.filter((item) => item.isMember);
  },

  getAll() {
    return this.items;
  }
});

window.IndexStore = IndexStore;

export default IndexStore;

