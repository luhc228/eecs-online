from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.VirClass)
admin.site.register(models.ClassStudent)
