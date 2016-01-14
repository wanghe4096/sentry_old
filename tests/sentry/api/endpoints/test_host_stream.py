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



r = requests.post("http://localhost:9000/api/0/host-type", data={'host_type': 'mysql'} , auth=('t2@qq.com', '123'))

print r.text

r = requests.post("http://localhost:9000/api/0/hosts", data={
    "host_name": "h3",
    "host_key": "qweeee",
    "system": "linux",
    "distver": "3.1.0",
    "host_type": 'oracle'
}, auth=('t2@qq.com', '123'))



print 'r=========', r.text

r = requests.get("http://localhost:9000/api/0/hosts", auth=('t2@qq.com', '123'))

print r.text
