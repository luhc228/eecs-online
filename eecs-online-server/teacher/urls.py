from django.conf.urls import url

from teacher import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('edit', views.edit),
]