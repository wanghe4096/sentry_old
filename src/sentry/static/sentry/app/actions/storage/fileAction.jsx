/**
 * Title: fileAction.jsx
 * Author: bold
 * Date: 1/13/16.
 * Description: 。
 */

import Reflux from 'reflux';

const FileAction = Reflux.createActions({
  fetch:{
    children:['success','failed']
  }
});

FileAction.fetch.listen(function(options){

  const mockData = [
    {
      file_id:'file-1',
      file_name:'filename-1.log'
    },
    {
      file_id:'file-2',
      file_name:'filename-2.log'
    },
    {
      file_id:'file-3',
      file_name:'filename-3.log'
    },
    {
      file_id:'file-4',
      file_name:'filename-4.log'
    },
    {
      file_id:'file-5',
      file_name:'filename-5.log'
    },
    {
      file_id:'file-6',
      file_name:'filename-6.log'
    },
    {
      file_id:'file-7',
      file_name:'filename-7.log'
    },
    {
      file_id:'file-8',
      file_name:'filename-8.log'
    }
  ];
  this.success(mockData);
});

export default FileAction;