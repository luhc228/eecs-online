from django.db import models
from teacher.models import Teacher
from student.models import Student


# Create your models here.
class ClassStudent(models.Model):
    id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey("vir_class.VirClass", on_delete=models.CASCADE)
    student_id = models.ForeignKey('student.Student', on_delete=models.CASCADE)
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'class_student'

    def __str__(self):
        return str(self.class_id) + str(self.student_id)


class VirClassManage(models.Manager):
    def all(self, deleted=0):  # 重写all()方法
        class_queryset = super().all().filter(deleted=deleted)
        return class_queryset  # 获取所有未删除的班级

    def creat_class(self, class_name, student_id_list):
        vir_class = self.model()
        vir_class.class_name = class_name
        vir_class.save()
        # 添加到ClassStudent数据库中
        for i in range(len(student_id_list)):
            class_student = ClassStudent()
            class_student.class_id = vir_class
            class_student.student_id = Student.student_manage.get(id=str(student_id_list[i]))
            class_student.save()
        return vir_class

    def get_students(self, class_id):
        student_id_queryset = ClassStudent.objects.filter(class_id=class_id, deleted=0)
        student_list = []
        for i in range(len(student_id_queryset)):
            student_dict = {}
            student = Student.student_manage.get(id=student_id_queryset[i].student_id_id)
            student_dict['studentId'] = student.id
            student_dict['studentName'] = student.student_name
            student_dict['studentClass'] = student.student_class
            student_dict['studentCollege'] = student.student_college
            student_list.append(student_dict)
        return student_list

    def edit_class(self, class_id, class_name, student_id_list):
        vir_class = VirClass.class_manage.get(id=class_id)
        student_class_queryset = ClassStudent.objects.filter(class_id=class_id)
        # 先删除所有的数据,这里不是修改的delted属性，而是直接删除
        if student_class_queryset:
            for i in student_class_queryset:
                i.delete()
        # 添加到ClassStudent数据库中
        for i in range(len(student_id_list)):
            class_student = ClassStudent()
            class_student.class_id = vir_class
            class_student.student_id = Student.student_manage.get(id=str(student_id_list[i]))
            class_student.save()
        # 如果class_name不是空的就更改
        if class_name:
            vir_class.class_name = class_name
            vir_class.save()
        return vir_class.class_name

    def delete(self, class_id):
        vir_class = VirClass.class_manage.get(id=class_id, deleted=0)  # 获取对应的course对象
        vir_class.deleted = 1
        vir_class.save()
        # 删除该班级下的学生
        for class_student in vir_class.classstudent_set.all():
            class_student.deleted = 1
            class_student.save()
        # 取消与班级对应的课程联系
        for course in vir_class.course_set.filter(class_id=vir_class.id):
            course.class_id.remove(vir_class)
        return vir_class  # 返回创建的对象


class VirClass(models.Model):
    id = models.AutoField(primary_key=True)
    class_name = models.CharField(max_length=128, blank=False)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class_manage = VirClassManage()

    class Meta:
        db_table = 'vir_class'

    def __str__(self):
        return self.class_name
