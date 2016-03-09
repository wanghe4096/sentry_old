import Reflux from 'reflux';
import EventAction from 'actions/livelog/eventAction';

const EventStore = Reflux.createStore({
  listenables: EventAction,
  onSend(event) {
    // TODO 需要做节流阀 + 队列，防止前端压力过大
    this.trigger(event)
  }
});

export default EventStore;
