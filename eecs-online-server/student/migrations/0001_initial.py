# Generated by Django 2.2.6 on 2019-12-12 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.CharField(max_length=128, primary_key=True, serialize=False, unique=True)),
                ('student_name', models.CharField(max_length=128)),
                ('student_gender', models.CharField(default='男', max_length=128)),
                ('student_class', models.CharField(max_length=128)),
                ('student_college', models.CharField(max_length=128)),
                ('creat_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.IntegerField(choices=[(0, '未删除'), (1, '已删除')], default=0)),
            ],
            options={
                'db_table': 'student',
            },
        ),
    ]