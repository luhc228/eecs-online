from django.db import models
from login.models import User


# Create your models here.

class StudentManage(models.Manager):

    def student_edit(self, id, name, college, student_class, gender, password):
        student = Student.student_manage.get(id=id)
        student.student_name = name
        student.student_gender = gender
        student.student_class = student_class
        student.student_college = college
        student.save()
        user = User.objects.get(user_id=id)
        user.password = password
        user.save()
        return student


class Student(models.Model):
    id = models.CharField(max_length=128, primary_key=True, blank=False, unique=True)
    student_name = models.CharField(max_length=128)
    student_gender = models.CharField(max_length=128, default="男")
    student_class = models.CharField(max_length=128)
    student_college = models.IntegerField(
        choices=((0, '信息科学与工程学院'), (1, '法学院'), (2, '政治学与公共管理学院'), (3, '计算机科学与技术学院'), (4, '生命科学学院'), (5, '环境科学与工程学院')),
        default=0)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    student_manage = StudentManage()

    class Meta:
        db_table = 'student'

    def __str__(self):
        return self.student_name
