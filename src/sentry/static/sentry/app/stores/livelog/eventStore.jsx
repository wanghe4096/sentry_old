import Reflux from 'reflux';
import EventAction from 'actions/livelog/eventAction';

const EventStore = Reflux.createStore({
  listenables: EventAction,
  onSend(event) {
    this.trigger(event)
  }
});

export default EventStore;
