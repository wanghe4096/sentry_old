/**
 * Title: eventsAction.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import Reflux from 'reflux';

const EventActions = Reflux.createActions({
  fetch: {
    children: ['success', 'failed']
  }
});

EventActions.fetch.listen(function (startAt, endAt) {
  //console.log(`fetch startAt:${startAt} endAt:${endAt}`);

  let mockData = [
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.81 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.6 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },
    {
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    },{
      create_timestamp: "2016-01-20 15:27:03.808780",
      file_id: 0,
      last_timestamp: "2016-01-20 15:27:03.808801",
      offset: 1000,
      payload: `192.168.133.3 - - [25/Mar/2015:09:59:02 +0800] "GET /drupal7/?q=forum/56 HTTP/1.1" 200 7552 "http://221.176.36.22/drupal7/?q=forum" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
    }
  ];
  this.success(mockData);

});

export default EventActions;