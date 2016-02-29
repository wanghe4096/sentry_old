/**
 * Title: eventsStore.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import Reflux from 'reflux';
import EventsActions from 'actions/extract/eventsAction';
import _ from 'underscore';

const EventStore = Reflux.createStore({
  listenables: EventsActions,

  items: [],

  init() {

  },

  onFetchSuccess(items) {
    this.items = items;
    this.trigger(this.items);
  },

  onFetchFailed(e) {
    console.log('fetch err:', e);
  }
});

export default EventStore;
