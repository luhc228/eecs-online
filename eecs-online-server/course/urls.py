from django.conf.urls import url

from course import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('pagination', views.paginator_view),
    url('add', views.add),
    url('update', views.update),
    url('delete', views.delete),
    url('list', views.list_course),
]