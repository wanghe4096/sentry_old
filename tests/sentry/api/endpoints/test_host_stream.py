import requests

print 'add host-type '
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'oracle'} , auth=('wangh@loginsight.cn', '123'))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'proxy'} , auth=('wangh@loginsight.cn', '123'))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'tomcat'} , auth=('wangh@loginsight.cn', '123'))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'nginx'} , auth=('wangh@loginsight.cn', '123'))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'mysql'} , auth=('wangh@loginsight.cn', '123'))
r = requests.get("http://localhost:9000/api/0/host-type", auth=('wangh@loginsight.cn', '123'))
print r.text


print 'add host '

r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h1",
    "host_key": "xxxx",
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'mysql',
    "user": 1
}, auth=('wangh@loginsight.cn', '123'))

r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h2",
    "host_key": "yyyy",
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'nginx'
}, auth=('wangh@loginsight.cn', '123'))

print r.text


print 'Add Stream Type '

r = requests.post("http://localhost:9000/api/0/stream-type", data={
    "stream_type": "nginx.access"
},   auth=('wangh@loginsight.cn', '123'))
print r.text

r = requests.post("http://localhost:9000/api/0/stream-type", data={
    "stream_type": "nginx.error"
},   auth=('wangh@loginsight.cn', '123'))
print r.text


r = requests.get("http://localhost:9000/api/0/stream-type", auth=('wangh@loginsight.cn', '123'))
print r.text


r = requests.post("http://localhost:9000/api/0/streams", data = {
    'stream_name': 'nginx.access.log',
    'stream_type': 'nginx.access',
    'host_id': 1
},  auth=('wangh@loginsight.cn', '123'))

print r, r.text

r = requests.post("http://localhost:9000/api/0/streams", data = {
    'stream_name': 'nginx.error.log',
    'stream_type': 'nginx.error',
    'host_id': 1
},  auth=('wangh@loginsight.cn', '123'))

print r, r.text


r = requests.get("http://localhost:9000/api/0/streams?host_id=1", auth=('wangh@loginsight.cn', '123'))
print r
print 'r = ', r.text


import datetime

# add Log file
r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'access.log',
    'file_path': '/var/log/nginx/access.log',
    'host_id': 1,
    'stream_name': 'nginx.error.log',
    # 'create_timestamp': str(datetime.datetime.now()),
    # 'modify_timestamp': str(datetime.datetime.now()),
    # 'file_size': 64*1024,
    'crc32_value': 123
}, auth=('wangh@loginsight.cn', '123'))

print r
print r.text


r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'error.log',
    'file_path': '/var/log/nginx/error.log',
    'host_id': 1,
    'stream_name': 'nginx.error.log',
    # 'create_timestamp': str(datetime.datetime.now()),
    # 'modify_timestamp': str(datetime.datetime.now()),
    # 'file_size': 64*1024,
    'crc32_value': 3245
}, auth=('wangh@loginsight.cn', '123'))

print r
print r.text


r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'error.log',
    'file_path': '/var/log/apache/error.log',
    'host_id': 1,
    'stream_name': 'nginx.error.log',
    # 'create_timestamp': str(datetime.datetime.now()),
    # 'modify_timestamp': str(datetime.datetime.now()),
    # 'file_size': 64*1024,
    'crc32_value': 12353
}, auth=('wangh@loginsight.cn', '123'))

print r
print r.text

r = requests.get("http://localhost:9000/api/0/logfiles?host_id=1", auth=('wangh@loginsight.cn', '123'))
print r, r.text


# add log event
print 'Add log event'
fd = open('/Users/wanghe/LogSample/apache/apache.log', 'r')
lines = fd.readlines()
i = 1
for raw in lines:

    r = requests.post("http://localhost:9000/api/0/logevents", data={
        'payload': raw,
        'offset': i,
        'file_id': 10,
        'host_id': 1
    }, auth=('wangh@loginsight.cn', '123'))
    i = i + 1
    print r, r.text


