from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Homework)
admin.site.register(models.HomeworkQuestion)