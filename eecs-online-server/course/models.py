from django.db import models
from teacher.models import Teacher, TeacherManage
from student.models import Student
from vir_class.models import *


# Create your models here.


class CourseManage(models.Manager):
    def all(self):  # 重写all()方法
        course_queryset = super().all().filter(deleted=0)
        return course_queryset  # 获取所有未删除的课程

    def creat_course(self, name, location, time, class_id, teacher_id):
        course = self.model()
        course.course_name = name
        course.course_location = location
        course.course_time = time
        course.teacher_id = Teacher.teacher_manage.get(id=str(teacher_id))
        course.class_id = VirClass.class_manage.get(id=class_id)  # 先建立班级(班级名都是固定的)，后创建课程
        course.save()
        return course  # 返回创建的对象

    def update_course(self, id, name, location, time, class_id, teacher_id):
        course = Course.course_manage.get(id=id, deleted=0)  # 获取对应的course对象
        course.course_name = name
        course.course_location = location
        course.course_time = time
        course.teacher_id = Teacher.teacher_manage.get(id=teacher_id)
        course.class_id = VirClass.class_manage.get(id=class_id)  # 先建立班级，后创建课程
        course.save()
        return course  # 返回创建的对象

    def delete_course(self, id):
        course = Course.course_manage.get(id=id, deleted=0)  # 获取对应的course对象
        course.deleted = 1
        course.save()
        return course  # 返回创建的对象


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=128, blank=False)
    course_location = models.CharField(max_length=255, blank=False)
    course_time = models.CharField(max_length=128, blank=False)

    teacher_id = models.ForeignKey('teacher.Teacher', on_delete=models.CASCADE)
    class_id = models.ForeignKey('vir_class.VirClass', on_delete=models.CASCADE)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    course_manage = CourseManage()

    class Meta:
        db_table = 'course'

    def __str__(self):
        return self.course_name
