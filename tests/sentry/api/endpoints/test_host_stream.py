import requests
import hashlib
import datetime


username = 'bold@oluul.com'
password = '123456'
print 'add host-type '
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'oracle'})
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'proxy'})
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'tomcat'})
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'nginx'} )
r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'mysql'} )
r = requests.get("http://localhost:9000/api/0/host-type")
print r.text

print 'add host '

m = hashlib.md5()
m.update(str(datetime.datetime.now()))
host_key = m.hexdigest()
r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "mysql@linux",
    "host_key": host_key,
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'mysql',
    "user": 1
})

m = hashlib.md5()
m.update(str(datetime.datetime.now()))
host_key = m.hexdigest()
r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h2",
    "host_key": host_key,
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'nginx'
})



# print r.text
#
#
# print 'Add Stream Type '
#
# r = requests.post("http://localhost:9000/api/0/stream-type", data={
#     "stream_type": "nginx.access"
# },   )
# print r.text
#
# r = requests.post("http://localhost:9000/api/0/stream-type", data={
#     "stream_type": "nginx.error"
# })
# print r.text
#
#
# r = requests.get("http://localhost:9000/api/0/stream-type", )
# print r.text
#
#
# r = requests.post("http://localhost:9000/api/0/streams", data = {
#     'stream_name': 'nginx.access.log',
#     'stream_type': 'nginx.access',
#     'host_id': 1
# })
#
# print r, r.text
#
# r = requests.post("http://localhost:9000/api/0/streams", data = {
#     'stream_name': 'nginx.error.log',
#     'stream_type': 'nginx.error',
#     'host_id': 1
# })
#
# print r, r.text
#
#
# r = requests.get("http://localhost:9000/api/0/streams?host_id=1", )
# print r
# print 'r = ', r.text
#
#
# import datetime
#
# # add Log file
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'access.log',
#     'file_path': '/var/log/nginx/access.log',
#     'host_id': 1,
#     'stream_name': 'nginx.error.log',
#     'host_key': 'ece926d8c0356205276a45266d361161',
#     # 'create_timestamp': str(datetime.datetime.now()),
#     # 'modify_timestamp': str(datetime.datetime.now()),
#     # 'file_size': 64*1024,
#     'crc32_value': 123
# }, )
#
# print r
# print r.text
#
#
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/nginx/error.log',
#     'host_id': 1,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 1,
#     'crc32_value': 3245
# })
#
# print r
# print r.text
#
#
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/nginx/error.log',
#     'host_id': 1,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 1,
#     # 'create_timestamp': str(datetime.datetime.now()),
#     # 'modify_timestamp': str(datetime.datetime.now()),
#     # 'file_size': 64*1024,
#     'crc32_value': 1233245
# })
#
# print r
# print r.text
#
#
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/nginx/error.log',
#     'host_id': 1,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 2,
#     # 'create_timestamp': str(datetime.datetime.now()),
#     # 'modify_timestamp': str(datetime.datetime.now()),
#     # 'file_size': 64*1024,
#     'crc32_value': 123233245
# })
#
# print r
# print r.text
#
#
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/apache/error.log',
#     'host_id': 1,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 1,
#     'crc32_value': 12353
# }, )
#
#
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/apache/error.log',
#     'host_id': 2,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 1,
#     'crc32_value': 122432
# })
#
# #33eeee
# #33eeee
# r = requests.post("http://localhost:9000/api/0/logfiles", data={
#     'file_name': 'error.log',
#     'file_path': '/var/log/apache/error.log',
#     'host_id': 2,
#     'stream_name': 'nginx.error.log',
#     'stream_id': 1,
#     'crc32_value': 123531235
# })
#
#
#
# print r
# print r.text
#
# r = requests.get("http://localhost:9000/api/0/logfiles?host_id=1", )
# print r, r.text
#
#
# # add log event
# print 'Add log event'
# #`fd = open('/Users/wanghe/LogSample/apache/access_log', 'r')
# #lines = fd.readlines()
# #fd.close()
#
# r = requests.post("http://localhost:9000/api/0/logevents", data = {
#     'payload': "hello world!!",
#     'file_id': 1,
#     'host_id': 1,
#     'offset': 1
# }, )
#
# print r, r.text
#
#
# r = requests.get("http://localhost:9000/api/0/logevents?file_id=1&", )
# print r, r.text
#
#
#
#
#
