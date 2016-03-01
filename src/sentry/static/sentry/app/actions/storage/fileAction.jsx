/**
 * Title: fileAction.jsx
 * Author: bold
 * Date: 1/13/16.
 * Description: 。
 */

import Reflux from 'reflux';
import {Client} from './../../api';

const FileAction = Reflux.createActions({
  fetch:{
    children:['success','failed']
  }
});

FileAction.fetch.listen(function(streamId){

  var that = this;
  new Client().request('/logfiles/?stream_id=' + streamId, {
    success: function (data) {
      that.success(data);
    },
    error: function (e) {
      that.failed(e);
    }
  });

});

export default FileAction;
