from django.conf.urls import url

from homework import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('teacher/pagination', views.paginator_teacher),
    url('teacher/add', views.add),
    url('teacher/update', views.update),
    url('teacher/delete', views.delete),
    url('student/pagination', views.paginator_student),
    url('teacher/get', views.get_homework),
    url('student/question/list', views.get_homework_question)
]