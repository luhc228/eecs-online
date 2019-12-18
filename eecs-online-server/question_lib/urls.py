from django.conf.urls import url

from question_lib import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('teacher/pagination', views.pagination),
    url('question/teacher/detail', views.detail),
    url('question/teacher/add', views.add),
    url('question/teacher/update', views.update),
    url('question/teacher/delete', views.delete),
]