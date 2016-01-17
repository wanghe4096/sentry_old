# -*- coding: utf-8 -*-
#! /usr/bin/env python
# author      : wanghe
# email       : wangh@loginsight.cn
# company     : LogInsight
# Description :  Log Generator

"""
TODO:
    1 使用 Flask-script 支持系统的命令行接口 ?
        flask-script.readthedocs.org/en/latest/

    2 生成EVENT集合, EVENT message 内包含编号.

    3. 按序顺发送给sentry server

    4. 循环发送1分钟

    5. 输出:成功发送的EVENT,  每秒发送EVENT的数量

"""

from flask import Flask
from flask.ext.script import Command, Option
from flask.ext.script import Manager
import cronus.beat as beat
from cronus.timeout import timeout, TimeoutError
from raven import Client
import random
import time

client = Client('http://d69d677d37d3420583f6da36490fee34:efd1133590b146febfc86916c1ebb444@localhost:9000/7')


class CmdStart(Command):
    """
         start 压入MESSAGE
    """
    option_list = (
        Option('-c', dest='count', default='-1'),
    )

    events = []

    def __init__(self):
        for i in range(0, 1000000):
            msg = "%d this is test event " % i
            self.events.append(msg)

    def run(self, count):
        """
            if durtime is -1, infint
        """
        count = int(count)
        start_time = time.time()
        print 'start ...'
        i = 0
        for i in range(0, count):
            client.captureMessage(self.events[i])
        end_time = time.time()
        print 'i= ', i
        print 'time: ', end_time - start_time


def build_manager(app):
    # configure your app
    manager = Manager(app, with_default_commands=False)
    manager.add_command("start", CmdStart())
    return manager


if __name__ == "__main__":
    app = Flask(__name__)
    manager = build_manager(app)
    manager.run()

