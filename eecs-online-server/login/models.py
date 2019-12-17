from django.db import models


# Create your models here.
class User(models.Model):
    user_id = models.CharField(max_length=128, primary_key=True, blank=False, unique=True)
    password = models.CharField(max_length=128, blank=False)

    class Meta:
        db_table = 'user_id'

    def __str__(self):
        return self.user_id
