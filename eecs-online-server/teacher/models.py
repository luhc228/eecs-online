from django.db import models
from login.models import User


# Create your models here.

class TeacherManage(models.Manager):

    def teacher_edit(self, id, name, college, gender, password):
        user = User.objects.get(user_id=id)
        user.password = password
        user.save()

        teacher = Teacher.teacher_manage.get(id=id)
        teacher.teacher_name = name
        teacher.teacher_gender = gender
        teacher.teacher_college = college
        teacher.save()
        return teacher


class Teacher(models.Model):
    id = models.CharField(max_length=128, primary_key=True, blank=False, unique=True)
    teacher_name = models.CharField(max_length=128)
    teacher_gender = models.CharField(max_length=128, default="男")
    teacher_college = models.CharField(max_length=128)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    teacher_manage = TeacherManage()

    class Meta:
        db_table = 'teacher'

    def __str__(self):
        return self.teacher_name
