# Generated by Django 2.2.6 on 2019-12-24 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vir_class', '0001_initial'),
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='class_id',
        ),
        migrations.AddField(
            model_name='course',
            name='class_id',
            field=models.ManyToManyField(to='vir_class.VirClass'),
        ),
    ]
