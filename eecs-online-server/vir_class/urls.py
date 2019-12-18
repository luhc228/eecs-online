from django.conf.urls import url

from vir_class import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('pagination', views.paginator_class),
    url('add', views.add),
    url('get', views.get),
    url('edit', views.edit),
    url('delete', views.delete),
    url('list', views.list),
]