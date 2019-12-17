from django.db import models

# Create your models here.
from django.db.models import Sum

from course.models import Course
from homework.models import Homework
from question_lib.models import QuestionLib
from student.models import Student
from vir_class.models import VirClass


class QuestionConditionManage(models.Manager):

    def question_condition_list(self, student_id, question_id):
        homework = []
        for i in range(len(question_id.object_list)):
            question_dict = {}
            question_dict['questionId'] = question_id.object_list[i]['question_lib_id_id']
            # 题目对象
            question_lib = QuestionLib.question_lib_manage.get(id=question_dict['questionId'])

            question_dict['content'] = question_lib.content
            question_dict['contentImage'] = question_lib.content_image
            question_dict['questionType'] = question_lib.question_type
            question_dict['options'] = question_lib.options
            question_dict['answer'] = question_lib.answer
            question_dict['questionScore'] = question_lib.question_score
            # 某个学生某个题目完成情况对象
            question_condition = QuestionCondition.question_condition_manage.get(
                question_lib_id=question_dict['questionId'],
                student_id=student_id)

            question_dict['status'] = question_condition.status
            question_dict['submitAnswer'] = question_condition.submit_answer
            question_dict['questionScore'] = question_condition.question_score

            homework.append(question_dict)
        return homework

    def answer_save(self, student_id, homework_id, answer_list):
        for i in range(len(answer_list)):
            print(answer_list)
            question_id = answer_list[i]['questionId']
            answer = answer_list[i]['submitAnswer']
            question_score = answer_list[i]['questionScore']
            question_condition = QuestionCondition.question_condition_manage.filter(homework_id=homework_id,
                                                                                    student_id=student_id,
                                                                                    question_lib_id=question_id)
            print(question_condition)
            if question_condition:
                question_condition.submit_answer = answer
                question_condition.question_score = question_score
                question_condition.status = 0
                question_condition.save()
            else:
                question_condition = QuestionCondition()
                question_condition.student_id_id = student_id
                question_condition.homework_id_id = homework_id
                question_condition.question_lib_id_id = question_id
                question_condition.submit_answer = answer
                question_condition.question_score = question_score
                question_condition.status = 0
                question_condition.save()
        return None

    def answer_submit(self, student_id, homework_id, answer_list):
        score_dict = {}
        homework_score = 0
        for i in range(len(answer_list)):
            question_id = answer_list[i]['questionId']
            answer = answer_list[i]['submitAnswer']
            question_score = answer_list[i]['questionScore']
            question_condition = QuestionCondition.question_condition_manage.get(homework_id=homework_id,
                                                                                 student_id=student_id,
                                                                                 question_lib_id=question_id)
            if question_condition:
                question_condition.submit_answer = answer
                question_condition.question_score = question_score
                question_condition.status = 1
                question_condition.save()
                score_dict[question_id] = question_score
                homework_score = homework_score + int(question_score)
            else:
                question_condition = QuestionCondition()
                question_condition.student_id_id = student_id
                question_condition.homework_id_id = homework_id
                question_condition.question_lib_id_id = question_id
                question_condition.submit_answer = answer
                question_condition.question_score = question_score
                question_condition.status = 1
                question_condition.save()
                score_dict[question_id] = question_score
                homework_score = homework_score + int(question_score)

        return score_dict, homework_score

    def students_homework_condition(self, course_id, class_id, homework_id, student_id):
        homework = []
        for i in range(len(student_id.object_list)):
            print(student_id.object_list[i])
            student_dict = {}
            student_dict['courseId'] = course_id
            student_dict['courseName'] = Course.course_manage.get(id=course_id).course_name
            student_dict['classId'] = class_id
            student_dict['className'] = VirClass.class_manage.get(id=class_id).class_name
            student_dict['homeworkId'] = homework_id
            student_dict['homeworkName'] = Homework.homework_manage.get(id=homework_id).homework_name
            student_dict['studentId'] = student_id.object_list[i]['student_id_id']
            student_dict['studentName'] = Student.student_manage.get(id=student_dict['studentId']).student_name
            student_dict['homeworkScore'] = QuestionCondition.question_condition_manage.filter(
                student_id=student_dict['studentId'], homework_id=homework_id).aggregate(Sum('question_score'))[
                'question_score__sum']
            homework.append(student_dict)
        return homework

    def question_score_edit(self, student_id, homework_id, question_id, score):
        question_condition = QuestionCondition.question_condition_manage.get(student_id=student_id,
                                                                             homework_id=homework_id,
                                                                             question_lib_id=question_id)
        question_condition.question_score = score
        question_condition.save()
        return None


# 题目信息表，对应的是某个学生某道题的得分情况
class QuestionCondition(models.Model):
    id = models.AutoField(primary_key=True)

    homework_id = models.ForeignKey('homework.Homework', on_delete=models.CASCADE)
    question_lib_id = models.ForeignKey('question_lib.QuestionLib', on_delete=models.CASCADE)
    student_id = models.ForeignKey('student.Student', on_delete=models.CASCADE)

    question_score = models.IntegerField(default=0)
    submit_answer = models.TextField(max_length=500, blank=True)

    status = models.IntegerField(choices=((0, '未完成'), (1, '已完成')), default=0)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    question_condition_manage = QuestionConditionManage()

    class Meta:
        db_table = 'question_condition'

    def __str__(self):
        return str(self.student_id) + str(self.homework_id) + str(self.question_lib_id)