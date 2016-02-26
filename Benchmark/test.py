# -*- coding: utf-8 -*-
"""
author : wanghe
company: LogInsight
email_ : wangh@loginsight.cn
"""


from raven import Client
import random
import time

dsn = 'http://58420b1934d7454b8fc836a938a69d1c:9455852ae6774f52b54df9560b9482f4@localhost:9000/8'

client = Client(dsn=dsn)

try:
    1/0
except ZeroDivisionError:
    client.captureException()