from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Student)
admin.site.register(models.TrueClass)
