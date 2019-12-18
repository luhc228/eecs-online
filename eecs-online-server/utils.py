import re

stop_words = ['']


def str_to_list(str_):
    list_ = re.split("\,|\[|\]", str_)
    for i in list_:
        j = i.strip()  # 去空格
        if j in stop_words:
            list_.remove(j)
    return list_
