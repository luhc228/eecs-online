from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.QuestionCondition)
admin.site.register(models.HomeworkCondition)
