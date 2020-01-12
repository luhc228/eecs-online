from django.db import models
from teacher.models import Teacher, TeacherManage
from student.models import Student
from vir_class.models import *


# Create your models here.


class CourseManage(models.Manager):
    def all(self):  # 重写all()方法
        course_queryset = super().all().filter(deleted=0)
        return course_queryset  # 获取所有未删除的课程

    def paginator_view(self, course):
        courses = []
        for i in range(len(course.object_list)):
            course_dict = {}
            course_dict['courseName'] = course.object_list[i]['course_name']
            course_dict['courseId'] = course.object_list[i]['id']
            # course_dict['courseTime'] = course.object_list[i]['course_time']
            course_dict['courseLocation'] = course.object_list[i]['course_location']
            course_dict['teacherName'] = Teacher.teacher_manage.get(
                id=course.object_list[i]['teacher_id_id']).teacher_name
            class_objects = Course.course_manage.get(id=course_dict['courseId']).class_id.all()
            class_id = []
            class_name = []
            for vir_class in class_objects:
                class_id.append(vir_class.id)
                class_name.append(vir_class.class_name)
            course_dict['classId'] = class_id
            course_dict['className'] = class_name
            courses.append(course_dict)
        return courses

    def creat_course(self, name, location, class_id, teacher_id):
        course = self.model()
        course.course_name = name
        course.course_location = location
        # course.course_time = time
        course.teacher_id = Teacher.teacher_manage.get(id=str(teacher_id))
        course.save()
        for i in range(len(class_id)):
            vir_class = VirClass.class_manage.get(id=class_id[i])
            course.class_id.add(vir_class)  # 先建立班级(班级名都是固定的)，后创建课程
        return course  # 返回创建的对象

    def update_course(self, id, name, location, class_ids, teacher_id):
        course = Course.course_manage.get(id=id, deleted=0)  # 获取对应的course对象
        course.course_name = name
        course.course_location = location
        # course.course_time = time
        course.teacher_id = Teacher.teacher_manage.get(id=teacher_id)
        course.save()
        for vir_class in course.class_id.all():
            course.class_id.remove(vir_class)
        for class_id in class_ids:
            vir_class = VirClass.class_manage.get(id=class_id)
            course.class_id.add(vir_class)  # 先建立班级，后创建课程
        return course  # 返回创建的对象

    def delete_course(self, id):
        course = Course.course_manage.get(id=id, deleted=0)  # 获取对应的course对象
        course.deleted = 1
        course.save()
        # 删除班级后删除对应的班级
        for vir_class in course.class_id.all():
            course.class_id.remove(vir_class)
        # 删除班级后删除对应的作业，直接调用homework里的delete函数
        for homework in course.homework_set.all():
            homework.deleted = 1
            homework.save()
            # 删除对应作业下的题目
            for homeworkquestion in homework.homeworkquestion_set.all():
                homeworkquestion.deleted = 1
                homeworkquestion.save()
        return course  # 返回创建的对象


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=128, blank=False)
    course_location = models.CharField(max_length=255, blank=False)
    course_time = models.CharField(max_length=128, blank=False)

    teacher_id = models.ForeignKey('teacher.Teacher', on_delete=models.CASCADE)
    class_id = models.ManyToManyField('vir_class.VirClass')

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    course_manage = CourseManage()

    class Meta:
        db_table = 'course'

    def __str__(self):
        return self.course_name
