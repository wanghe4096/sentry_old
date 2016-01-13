/**
 * Title: streamAction.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import Reflux from 'reflux';
import _ from 'underscore';

const StreamActions = Reflux.createActions({
  fetch: {
    children:['success','failed']
  }
});

StreamActions.fetch.listen(function(hostId){

  var mockData = [
    {
      stream_id:'stream-1('+hostId+')',
      stream_name:'xxxx-1',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-2('+hostId+')',
      stream_name:'xxxx-2',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-3('+hostId+')',
      stream_name:'xxxx-3',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-4('+hostId+')',
      stream_name:'xxxx-4',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-5('+hostId+')',
      stream_name:'xxxx-5',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-6('+hostId+')',
      stream_name:'xxxx-6',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    },
    {
      stream_id:'stream-7('+hostId+')',
      stream_name:'xxxx-7',
      stream_tag:'xxxx xxxx',
      host:{
        host_id:'xxxxxx',
        host_name:'xxxxxxx',
        host_type:'xxxxx'
      }
    }
  ];


  mockData = mockData.slice(_.random(0,2),_.random(3,7));

  this.success(mockData);
});

export default StreamActions;