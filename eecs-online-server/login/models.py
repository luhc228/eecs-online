from django.db import models

# Create your models here.


class Student(models.Model):
    id = models.CharField(max_length=128, primary_key=True, blank=False,unique=True)
    student_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=128, default="男")
    student_class = models.CharField(max_length=128)
    student_college = models.CharField(max_length=128)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'student'

    def __str__(self):
        return self.student_name


class Teacher(models.Model):
    id = models.CharField(max_length=128, primary_key=True, blank=False, unique=True)
    teacher_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=128, default="男")
    teacher_college = models.CharField(max_length=128)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'teacher'

    def __str__(self):
        return self.teacher_name


class User(models.Model):
    userId = models.CharField(max_length=128, primary_key=True, blank=False, unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'userId'

    def __str__(self):
        return self.userId
