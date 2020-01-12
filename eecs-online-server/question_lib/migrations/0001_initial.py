# Generated by Django 2.2.6 on 2019-12-12 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionLib',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('unit', models.CharField(max_length=128)),
                ('question_type', models.CharField(max_length=128)),
                ('content', models.CharField(max_length=255)),
                ('content_image', models.CharField(blank=True, max_length=255)),
                ('options', models.TextField(blank=True, max_length=255)),
                ('answer', models.TextField(blank=True, max_length=255)),
                ('question_score', models.CharField(max_length=128)),
                ('creat_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.IntegerField(choices=[(0, '未删除'), (1, '已删除')], default=0)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Course')),
            ],
            options={
                'db_table': 'question_lib',
            },
        ),
    ]
