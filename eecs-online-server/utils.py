import re
import datetime
import time


def str_to_list(str):
    return str.split("|")


# 将日期字符串转为时间再比较，time，datetime,str
def valid_date(timestr):
    # 获取当前时间日期
    nowTime_str = datetime.datetime.now().strftime('%Y-%m-%d')
    print(nowTime_str)
    # mktime参数为struc_time,将日期转化为秒，
    e_time = time.mktime(time.strptime(nowTime_str, "%Y-%m-%d"))
    print(e_time)
    try:
        s_time = time.mktime(time.strptime(timestr, '%Y-%m-%d'))
        print(s_time)
        # 日期转化为int比较
        diff = int(s_time) - int(e_time)
        print(diff)
        if diff >= 0:
            return 1
        else:
            print('所查日期不能小于当前时间！！！')
            return 0
    except Exception as e:
        print(e)
