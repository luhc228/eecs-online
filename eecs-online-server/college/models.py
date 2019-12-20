from django.db import models


# Create your models here.

class College(models.Model):
    id = models.IntegerField(primary_key=True, blank=False, unique=True)
    college = models.CharField(max_length=128, blank=False, unique=True)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'college'

    def __str__(self):
        return self.college
