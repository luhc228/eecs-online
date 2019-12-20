from django.conf.urls import url

from student import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('detail/pagination', views.paginator_student),
    url('edit', views.edit),
    url('detail', views.detail),
    url('college', views.list_college)
]