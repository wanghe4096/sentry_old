# API 列表

## 获取和更新USER_KEY
   GET /api/0/user_key
   request:
   {
    'username':
    'password':
   }

   response:
   {
    'user_key': '234asdfaj32sfhasdf234123'
   }

## 获取主机列表
    - request
        GET /api/0/hosts
    
    - response 
      [
          {
            "distver": "3.2.1",
            "host_key": "2e092f112aa23d650bee15aa6d2582ce",
            "host_type": "web服务器",
            "system": "centos",
            "host_name": "a23d650bee@centos",
            "id": "1"
          },
          {
            "distver": "3.1.0",
            "host_key": "7104fc4c8c34e40e555bf9b75f591aea",
            "host_type": "web服务器",
            "system": "centos",
            "host_name": "a2adf65asdf0bee@centos",
            "id": "2"
          }
      ]
## AGENT 注册主机
    - request
        POST /api/0/hosts
        {
            "user_key": 
            "host_key":
            "host_type":
            "system":
            "host_name":
            "distver":
        }
    - response
        {
            'msg': 'ok/failed'
        }
## agent 获取配置文件
   - request
       GET /api/0/agent_config
    
       {
            "user_key": ""
            "host_key": ""
       }
   
   - response
       {
        "config": "config content"
       }

## 更新 agent配置文件
    POST /api/0/agent_config
    {
        "user_key": "user_key content",
        "host_key":
        "config": "config content"
    }

## 获取文件列表
   - request
   GET /api/0/logfiles?stream_id=1
   
   - response
   
   [
      {
        "file_name": "access.log",
        "file_path": "/var/log/nginx",
        "stream_id": 1,
        "host_id": "1",
        "id": "1",
        "size": 491577
      },
      {
        "file_name": "access.log.0",
        "file_path": "/var/log/nginx",
        "stream_id": 1,
        "host_id": "1",
        "id": "2",
        "size": 807799
      }
   ]
   
## 获取 events 
   - request
   GET /api/0/logevents
   {
        "file_id": 
        "event_offset": 
        "event_count":
   }
   - response
    [
          {
            "last_timestamp": "2016-01-18 14:09:40.291585",
            "file_id": 0,
            "offset": 19,
            "create_timestamp": "2016-01-18 14:09:40.291583",
            "payload": "116.22.234.54 - - [02/Jul/2014:14:09:57 +0800] \"GET //audio/js/jquery.jplayer.min.js HTTP/1.1\" 304 -\n",
            "size": "101"
          },
          {
            "last_timestamp": "2016-01-18 14:09:40.291585",
            "file_id": 0,
            "offset": 19,
            "create_timestamp": "2016-01-18 14:09:40.291583",
            "payload": "116.22.234.54 - - [02/Jul/2014:14:09:57 +0800] \"GET //audio/js/jquery.jplayer.min.js HTTP/1.1\" 304 -\n",
            "size": "101"
          }
   ]
   
## 获取stream 
   - request
   GET /api/0/streams
    {
        "host_id": 
    }
    
   - response
   [
      {
        "stream_name": "nginx.access",
        "last_timestamp": "2016-01-18 14:15:48.308708",
        "create_timestamp": "2016-01-18 14:15:48.308696",
        "host_id": 1,
        "id": 1,
        "size": 72860
      },
      {
        "stream_name": "nginx.error",
        "last_timestamp": "2016-01-18 14:15:48.308717",
        "create_timestamp": "2016-01-18 14:15:48.308715",
        "host_id": 1,
        "id": 2,
        "size": 78176
      }
  ]
  
## 更新stream

    {
        'name': 'stream_name',
        'source': [{
            'host_id':
            'file_id':
        }],
        "last_timestamp": 
        "create_timestamp" 
        "host_id": 
        "size": 
        'options':{ 
            'extract_template': true,
             'sort_by_time': true, 
             'regex: true, 
             'exception_monitor: true,
             'sort_by_domain: true,
             'others: true 
             }
    }

 GET  /api/0/streams/templates

 POST /api/0/streams/templates

