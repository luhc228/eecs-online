from django.db import models

class ImageManage(models.Manager):
    def upload(self,img,name):
        image = Image()
        image.image = img
        image.name = name
        image.save()
        return image.image.url

# Create your models here.
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='image_db')
    name = models.CharField(max_length=128)

    image_manage = ImageManage()

    class Meta:
        db_table = 'image'

    def __str__(self):
        return str(self.name)
