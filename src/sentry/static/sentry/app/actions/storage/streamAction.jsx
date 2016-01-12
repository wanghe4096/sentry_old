/**
 * Title: streamAction.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import Reflux from 'reflux';

//const StreamActions = Reflux.createActions(['update','fetch']);
const StreamActions = Reflux.createActions({
  fetch: {
    asyncResult: true
  },
  get: {},
  getAll: {}
});

StreamActions.fetch.listen(function(){
  console.log('fetch');
});

export default StreamActions;