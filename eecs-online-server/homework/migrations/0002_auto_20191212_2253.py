# Generated by Django 2.2.6 on 2019-12-12 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        ('homework', '0001_initial'),
        ('question_lib', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='homeworkquestion',
            name='question_lib_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_lib.QuestionLib'),
        ),
        migrations.AddField(
            model_name='homework',
            name='course_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Course'),
        ),
    ]
