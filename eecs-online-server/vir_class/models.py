from django.db import models


# Create your models here.


class VirClass(models.Model):
    class_name = models.CharField(max_length=128, blank=False)
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'vir_class'

    def __str__(self):
        return self.class_name


class ClassStudent(models.Model):
    class_id = models.ForeignKey("vir_class.VirClass", on_delete=models.CASCADE)
    student_id = models.ForeignKey('login.Student', on_delete=models.CASCADE)
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'class_student'

    def __str__(self):
        return str(self.class_id) + str(self.student_id)
