import requests

username = 'bold@oluul.com'
password = '123456'
print 'add host-type '
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'oracle'} , auth=(username, password))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'proxy'} , auth=(username, password))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'tomcat'} , auth=(username, password))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'nginx'} , auth=(username, password))
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'mysql'} , auth=(username, password))
r = requests.get("http://localhost:9000/api/0/host-type", auth=(username, password))
print r.text


print 'add host '

r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h1",
    "host_key": "xxxx",
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'mysql',
    "user": 1
}, auth=(username, password))

r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h2",
    "host_key": "yyyy",
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'nginx'
}, auth=(username, password))

print r.text


print 'Add Stream Type '

r = requests.post("http://localhost:9000/api/0/stream-type", data={
    "stream_type": "nginx.access"
},   auth=(username, password))
print r.text

r = requests.post("http://localhost:9000/api/0/stream-type", data={
    "stream_type": "nginx.error"
},   auth=(username, password))
print r.text


r = requests.get("http://localhost:9000/api/0/stream-type", auth=(username, password))
print r.text


r = requests.post("http://localhost:9000/api/0/streams", data = {
    'stream_name': 'nginx.access.log',
    'stream_type': 'nginx.access',
    'host_id': 1
},  auth=(username, password))

print r, r.text

r = requests.post("http://localhost:9000/api/0/streams", data = {
    'stream_name': 'nginx.error.log',
    'stream_type': 'nginx.error',
    'host_id': 1
},  auth=(username, password))

print r, r.text


r = requests.get("http://localhost:9000/api/0/streams?host_id=1", auth=(username, password))
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
}, auth=(username, password))

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
}, auth=(username, password))

print r
print r.text


r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'error.log',
    'file_path': '/var/log/apache/error.log',
    'host_id': 1,
    'stream_name': 'nginx.error.log',
    'stream_id': 1,
    'crc32_value': 12353
}, auth=(username, password))


r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'error.log',
    'file_path': '/var/log/apache/error.log',
    'host_id': 2,
    'stream_name': 'nginx.error.log',
    'stream_id': 1,
    'crc32_value': 122432
})

r = requests.post("http://localhost:9000/api/0/logfiles", data={
    'file_name': 'error.log',
    'file_path': '/var/log/apache/error.log',
    'host_id': 2,
    'stream_name': 'nginx.error.log',
    'stream_id': 1,
    'crc32_value': 123531235
})



print r
print r.text

r = requests.get("http://localhost:9000/api/0/logfiles?host_id=1", auth=(username, password))
print r, r.text


# add log event
print 'Add log event'
#`fd = open('/Users/wanghe/LogSample/apache/access_log', 'r')
#lines = fd.readlines()
#fd.close()

r = requests.post("http://localhost:9000/api/0/logevents", data = {
    'payload': "hello world!!",
    'file_id': 1,
    'host_id': 1,
    'offset': 1
}, auth=(username, password))

print r, r.text


r = requests.get("http://localhost:9000/api/0/logevents?file_id=1&", auth=(username, password))
print r, r.text


# i = 1
# for raw in lines:
#     r = requests.post("http://localhost:9000/api/0/logevents", data={
#         'payload': raw,
#         'offset': i,
#         'file_id': 10,
#         'host_id': 1
#     }, auth=(username, password))
#     i = i + 1
#     if i == 100:
#         break
#     print r, r.text


