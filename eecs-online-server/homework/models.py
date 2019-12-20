import datetime

from django.db import models
from course.models import Course
from homework_condition.models import QuestionCondition
from question_lib.models import QuestionLib
from utils import str_to_list


# Create your models here.
# 课程下的homework关联的题目一对多的关系，向上关联homework,向下关联question


class HomeworkQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    homework_id = models.ForeignKey('homework.Homework', on_delete=models.CASCADE)
    question_lib_id = models.ForeignKey('question_lib.QuestionLib', on_delete=models.CASCADE)
    homework_question_score = models.CharField(max_length=128, blank=False)
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'homework_question'

    def __str__(self):
        return str(self.homework_id) + str(self.question_lib_id)


class HomeworkManage(models.Manager):
    def all(self):  # 重写all()方法
        homework_queryset = super().all().filter(deleted=0)
        return homework_queryset  # 获取所有未删除的作业

    def creat_homework(self, course_id, name, end, start, description, score, question_list):
        # 字符串转时间格式
        end = datetime.datetime.strptime(end, '%Y-%m-%d %H:%M:%S')
        start = datetime.datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
        homework = Homework()
        homework.course_id = Course.course_manage.get(id=course_id)
        homework.homework_name = name
        homework.end_at = end
        homework.start_at = start
        homework.description = description
        homework.homework_score = score
        homework.save()
        question_list = str_to_list(question_list)
        for i in range(len(question_list)):
            homework_question = HomeworkQuestion()
            homework_question.homework_id = homework
            homework_question.question_lib_id = QuestionLib.question_lib_manage.get(id=question_list[i])
            homework_question.save()
        return homework

    def update_homework(self, id, name, start, end, description, score, question_list):
        end = datetime.datetime.strptime(end, '%Y-%m-%d %H:%M:%S')
        start = datetime.datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
        homework = Homework.homework_manage.get(id=id)
        homework.homework_name = name
        homework.start_at = start
        homework.end_at = end
        homework.description = description
        homework.homework_score = score
        homework.save()

        homework_question_queryset = HomeworkQuestion.objects.filter(homework_id=id)
        # 先删除所有的数据,这里不是修改的delted属性，而是直接删除
        for i in homework_question_queryset:
            i.delete()
        # 字符串转列表
        question_list = str_to_list(question_list)
        for i in range(len(question_list)):
            homework_question = HomeworkQuestion()
            homework_question.homework_id = homework
            homework_question.question_lib_id = QuestionLib.question_lib_manage.get(id=question_list[i])
            homework_question.save()
        return None

    def get_homework(self, homework_id):
        homework_l = Homework.homework_manage.get(id=homework_id)
        # 时间格式转字符串homework_l.end_at.strftime("%Y-%m-%d %H:%M:%S")
        homework = {}
        homework['courseId'] = homework_l.course_id_id
        homework['courseName'] = Course.course_manage.get(id=homework['courseId']).course_name
        homework['homeworkName'] = homework_l.homework_name
        homework['homeworkId'] = homework_l.id
        homework['description'] = homework_l.description
        homework['homeworkScore'] = homework_l.homework_score
        homework['startAt'] = homework_l.start_at.strftime("%Y-%m-%d %H:%M:%S")
        homework['endAt'] = homework_l.end_at.strftime("%Y-%m-%d %H:%M:%S")
        return homework

    def delete_homework(self, id):
        homework = Homework.homework_manage.get(id=id, deleted=0)
        homework.deleted = 1
        for i in homework.homeworkquestion_set.all():
            i.deleted = 1
            i.save()
        for i in homework.questioncondition_set.all():
            i.deleted = 1
            i.save()
        homework.save()
        return homework

    def homework_condition_teacher(self, homework):
        homeworks = []
        for i in range(len(homework.object_list)):
            homework_dict = {}
            homework_dict['courseId'] = homework.object_list[i]['course_id_id']
            homework_dict['courseName'] = Course.course_manage.get(id=homework_dict['courseId']).course_name
            homework_dict['homeworkName'] = homework.object_list[i]['homework_name']
            homework_dict['homeworkId'] = homework.object_list[i]['id']
            homework_dict['description'] = homework.object_list[i]['description']
            homework_dict['homeworkScore'] = homework.object_list[i]['homework_score']
            homework_dict['startAt'] = homework.object_list[i]['start_at'].strftime("%Y-%m-%d %H:%M:%S")
            homework_dict['endAt'] = homework.object_list[i]['end_at'].strftime("%Y-%m-%d %H:%M:%S")
            if homework.object_list[i]['end_at'] < datetime.datetime.now():
                homework_dict['status'] = 1
            else:
                homework_dict['status'] = 0
            homeworks.append(homework_dict)
        return homeworks

    def homework_condition_student(self, homework, get_homework_status):
        homeworks = []
        for i in range(len(homework.object_list)):
            homework_dict = {}
            homework_dict['courseId'] = homework.object_list[i]['course_id_id']
            homework_dict['courseName'] = Course.course_manage.get(id=homework_dict['courseId']).course_name
            homework_dict['homeworkName'] = homework.object_list[i]['homework_name']
            homework_dict['homeworkId'] = homework.object_list[i]['id']
            homework_dict['description'] = homework.object_list[i]['description']
            homework_dict['homeworkScore'] = homework.object_list[i]['homework_score']
            homework_dict['startAt'] = homework.object_list[i]['start_at'].strftime("%Y-%m-%d %H:%M:%S")
            homework_dict['endAt'] = homework.object_list[i]['end_at'].strftime("%Y-%m-%d %H:%M:%S")
            # 如果到达截止日期或者题目完成情况下（即status=0为空），homwork的状态是1（已完成）
            if homework.object_list[i][
                'end_at'] < datetime.datetime.now() or QuestionCondition.question_condition_manage.filter(
                homework_id=homework_dict['homeworkId'], status=0):
                homework_dict['status'] = 1
            else:
                homework_dict['status'] = 0
            # 保留学生想要获取某个状态的作业信息
            if homework_dict['status'] == get_homework_status:
                homeworks.append(homework_dict)
            else:
                pass
        return homeworks


# homework数据库仅与course关联
class Homework(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey('course.Course', on_delete=models.CASCADE)
    homework_name = models.CharField(max_length=128, blank=False)
    description = models.CharField(max_length=255, blank=True)
    homework_score = models.CharField(max_length=128, blank=False)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    homework_manage = HomeworkManage()

    class Meta:
        db_table = 'homework'

    def __str__(self):
        return str(self.course_id) + self.homework_name
