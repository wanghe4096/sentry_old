/**
 * Title: configAction.jsx
 * Author: bold
 * Date: 1/21/16.
 * Description: 。
 */

import Reflux from 'reflux';

const ExtractorConfigActions = Reflux.createActions({
  fetch: {
    children: ['success', 'failed']
  }
});

ExtractorConfigActions.fetch.listen(function (streamId) {

  // todo: this is mock data
  this.success({
    action_name: 'xxxx',
    stream_id: streamId,
    last_extracted_at: window.location.hash === '#runed' ? new Date() : null,// mock:是否已运行过
    options: {}
  });

});

export default ExtractorConfigActions;