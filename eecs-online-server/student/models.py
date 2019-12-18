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
    student_college = models.CharField(max_length=128)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    student_manage = StudentManage()

    class Meta:
        db_table = 'student'

    def __str__(self):
        return self.student_name
