from django.conf.urls import url

from homework_condition import views


# 将网址映射成一个视图函数：前面是网址；后面是函数
urlpatterns = [
    url('student/list', views.question_condition_list),
    url('student/answer/save', views.answer_save),
    url('student/answer/submit', views.answer_submit),
    url('teacher/pagination', views.paginator),
    url('teacher/detail', views.detail),
    url('teacher/question/score/edit', views.score_edit),
]