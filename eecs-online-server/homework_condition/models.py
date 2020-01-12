from django.db import models
from django.db.models import Sum
from course.models import Course
from question_lib.models import QuestionLib
from student.models import Student
from utils import str_to_list
from vir_class.models import VirClass
from runStr import getAnswer


# Create your models here.
class QuestionConditionManage(models.Manager):

    def question_condition_list(self, homework_id, student_id, question_id):
        homework_score = QuestionLib.question_lib_manage.filter(
            homeworkquestion__homework_id=homework_id).aggregate(sum=Sum('question_score'))['sum']
        # 存储最终得分，如果是未完成就不需要返回了
        final_score = 0
        homework = []  # 存储学生对应的所有题目信息

        for i in range(len(question_id)):
            question_dict = {}
            question_dict['questionId'] = question_id[i]['question_lib_id_id']
            # 题目对象
            question_lib = QuestionLib.question_lib_manage.get(id=question_dict['questionId'], deleted=0)
            question_dict['content'] = question_lib.content
            question_dict['contentImage'] = question_lib.content_image
            question_dict['questionType'] = question_lib.question_type
            question_dict['options'] = question_lib.options
            question_dict['questionScore'] = question_lib.question_score
            # a = type(question_lib.answer)
            # question_dict['answer_type'] = str(a)
            # 某个学生某个题目完成情况对象
            # 先判断是否存在某个题目对应的完成情况，若没有则默认创建一个未提交的对象
            try:
                question_condition = QuestionCondition.question_condition_manage.get(homework_id =homework_id,
                    question_lib_id=question_dict['questionId'],
                    student_id=student_id, deleted=0)
            except:
                question_condition = QuestionCondition()
                question_condition.homework_id_id = homework_id
                question_condition.student_id_id = student_id
                question_condition.question_lib_id_id = question_dict['questionId']
                question_condition.question_score = 0
                # question_condition.submit_answer = None
                question_condition.save()

            question_dict['status'] = question_condition.status
            # 如果题目情况是没有提交答案，则没有这一个submitAnswer
            if question_condition.submit_answer:
                question_dict['submitAnswer'] = question_condition.submit_answer
            else:
                question_dict['submitAnswer'] = None
            # 返回题目答案在确定是否提交后才可以获取
            if question_dict['status'] == 1:
                question_dict['answer'] = question_lib.answer
                question_dict['score'] = question_condition.question_score
                final_score = final_score + question_condition.question_score
            homework.append(question_dict)
        return homework, homework_score, final_score

    def answer_save(self, student_id, homework_id, answer_list):
        for i in range(len(answer_list)):
            question_id = answer_list[i]['questionId']
            answer = answer_list[i]['submitAnswer']
            question_condition = QuestionCondition.question_condition_manage.filter(homework_id=homework_id,
                                                                                    student_id=student_id,
                                                                                    question_lib_id=question_id)
            if question_condition:
                question_condition = QuestionCondition.question_condition_manage.get(homework_id=homework_id,
                                                                                     student_id=student_id,
                                                                                     question_lib_id=question_id)
                question_condition.submit_answer = answer
                question_condition.question_score = 0
                question_condition.status = 0
                question_condition.save()
            else:
                question_condition = QuestionCondition()
                question_condition.student_id_id = student_id
                question_condition.homework_id_id = homework_id
                question_condition.question_lib_id_id = question_id
                question_condition.submit_answer = answer
                question_condition.question_score = 0
                question_condition.status = 0
                question_condition.save()
        return None

    def answer_submit(self, student_id, homework_id, answer_list):
        # 判断 作业完成数据库 里是否存在该学生的完成情况
        homework_condition = HomeworkCondition.objects.filter(student_id=student_id, homework_id=homework_id, deleted=0)
        if homework_condition:
            homework_condition = HomeworkCondition.objects.get(student_id=student_id, homework_id=homework_id,
                                                               deleted=0)
            homework_condition.homework_id_id = homework_id
            homework_condition.student_id_id = student_id
            homework_condition.status = 1
            homework_condition.save()
        else:
            homework_condition = HomeworkCondition()
            homework_condition.homework_id_id = homework_id
            homework_condition.student_id_id = student_id
            homework_condition.status = 1
            homework_condition.save()
        score_dict = {}
        homework_score = 0
        for i in range(len(answer_list)):
            question_id = answer_list[i]['questionId']
            answer = answer_list[i]['submitAnswer']
            question_condition = QuestionCondition.question_condition_manage.filter(homework_id=homework_id,
                                                                                    student_id=student_id,
                                                                                    question_lib_id=question_id)
            if question_condition:
                question_condition = QuestionCondition.question_condition_manage.get(homework_id=homework_id,
                                                                                     student_id=student_id,
                                                                                     question_lib_id=question_id)
                question_condition.submit_answer = answer
                question = QuestionLib.question_lib_manage.get(id=question_id)
                # 多选题
                if question.question_type == 1:
                    answer = str_to_list(answer).sort()
                # 判断题
                elif question.question_type == 2:
                    answer = str(answer)
                # 编程题
                elif question.question_type == 3:
                    answer = getAnswer(answer)
                # 多选题的特殊性需要进行一下处理
                if question.question_type == 1:
                    if answer == str_to_list(question.answer).sort():
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0
                elif question.question_type == 3:
                    print(answer)
                    print(eval(question.answer))
                    print(answer == eval(question.answer))
                    if answer == eval(question.answer):
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0
                else:
                    if answer == question.answer:
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0

                question_condition.status = 1
                question_condition.save()

                score_dict[question_id] = question_condition.question_score
                homework_score = homework_score + int(question_condition.question_score)
            else:
                question_condition = QuestionCondition()
                question_condition.student_id_id = student_id
                question_condition.homework_id_id = homework_id
                question_condition.question_lib_id_id = question_id
                question_condition.submit_answer = answer

                question = QuestionLib.question_lib_manage.get(id=question_id)
                # 多选题
                if question.question_type == 1:
                    answer = str_to_list(answer).sort()
                # 判断题
                elif question.question_type == 2:
                    answer = str(answer)
                # 编程题
                elif question.question_type == 3:
                    answer = getAnswer(answer)
                # 多选题的特殊性需要进行一下处理
                if question.question_type == 1:
                    if answer == str_to_list(question.answer).sort():
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0
                elif question.question_type == 3:
                    print(answer)
                    print(eval(question.answer))
                    print(answer == eval(question.answer))
                    if answer == eval(question.answer):
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0
                else:
                    if answer == question.answer:
                        question_condition.question_score = question.question_score
                    else:
                        question_condition.question_score = 0

                question_condition.status = 1
                question_condition.save()

                score_dict[question_id] = question_condition.question_score
                homework_score = homework_score + int(question_condition.question_score)

        return score_dict, homework_score

    def students_homework_condition(self, course_id, homework_id, student_id):
        homework = []
        for i in range(len(student_id.object_list)):
            student_dict = {}
            student_dict['courseId'] = course_id
            student_dict['courseName'] = Course.course_manage.get(id=course_id).course_name
            student_dict['classId'] = student_id.object_list[i]['class_id_id']
            student_dict['className'] = VirClass.class_manage.get(id=student_dict['classId']).class_name
            student_dict['homeworkId'] = homework_id
            student_dict['homeworkName'] = Course.course_manage.get(id=course_id).homework_set.get(
                id=homework_id).homework_name
            student_dict['studentId'] = student_id.object_list[i]['student_id_id']
            student_dict['studentName'] = Student.student_manage.get(id=str(student_dict['studentId'])).student_name
            try:
                homework_condition = HomeworkCondition.objects.get(student_id=student_dict['studentId'],
                                                                   homework_id=homework_id,
                                                                   deleted=0)
            except:
                homework_condition = HomeworkCondition()
                homework_condition.student_id_id = student_dict['studentId']
                homework_condition.homework_id_id = student_dict['homeworkId']
                homework_condition.status = 0
                homework_condition.save()                                           
            student_dict['status'] = homework_condition.status
            if homework_condition.status == 0:
                student_dict['homeworkScore'] = 0
            else:
                student_dict['homeworkScore'] = QuestionCondition.question_condition_manage.filter(
                    student_id=student_dict['studentId'], homework_id=homework_id).aggregate(Sum('question_score'))[
                    'question_score__sum']
            homework.append(student_dict)
        return homework

    def student_question_conditions(self, homework_id, student_id, question_id):
        homework_score = QuestionLib.question_lib_manage.filter(
            homeworkquestion__homework_id=homework_id).aggregate(sum=Sum('question_score'))['sum']
        final_score = 0
        homework = []
        question_score_list = []
        for i in range(len(question_id.object_list)):
            question_dict = {}
            question_dict['questionId'] = question_id.object_list[i]['question_lib_id_id']
            # 题目对象
            question_lib = QuestionLib.question_lib_manage.get(id=question_dict['questionId'], deleted=0)

            question_dict['content'] = question_lib.content
            question_dict['contentImage'] = question_lib.content_image
            question_dict['questionType'] = question_lib.question_type
            question_dict['options'] = question_lib.options
            question_dict['questionScore'] = question_lib.question_score
            # 某个学生某个题目完成情况对象
            # 先判断是否存在某个题目对应的完成情况，若没有则默认创建一个未提交的对象
            try:
                question_condition = QuestionCondition.question_condition_manage.get(
                    question_lib_id=question_dict['questionId'],
                    student_id=student_id, deleted=0, homework_id=homework_id)
            except:
                question_condition = QuestionCondition()
                question_condition.homework_id_id = homework_id
                question_condition.student_id_id = student_id
                question_condition.question_lib_id_id = question_dict['questionId']
                question_condition.save()

            question_dict['status'] = question_condition.status
            question_dict['submitAnswer'] = question_condition.submit_answer
            question_dict['answer'] = question_lib.answer
            question_dict['score'] = question_condition.question_score

            question_score = {}

            if question_dict['status'] == 1:
                final_score = final_score + question_condition.question_score
                question_score['questionId'] = question_dict['questionId']
                question_score['score'] = question_condition.question_score
                question_score_list.append(question_score)
            else:
                question_score['questionId'] = question_dict['questionId']
                question_score['score'] = 0
                question_score_list.append(question_score)
            homework.append(question_dict)
        return homework, homework_score, final_score, question_score_list

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
    submit_answer = models.TextField(max_length=500)

    status = models.IntegerField(choices=((0, '未完成'), (1, '已完成')), default=0)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    question_condition_manage = QuestionConditionManage()

    class Meta:
        db_table = 'question_condition'

    def __str__(self):
        return str(self.student_id) + str(self.homework_id) + str(self.question_lib_id)


class HomeworkCondition(models.Model):
    id = models.AutoField(primary_key=True)

    homework_id = models.ForeignKey('homework.Homework', on_delete=models.CASCADE)
    student_id = models.ForeignKey('student.Student', on_delete=models.CASCADE)
    # class_id = models.ForeignKey('vir_class.VirClass', on_delete=models.CASCADE)
    status = models.IntegerField(choices=((0, '未完成'), (1, '已完成')), default=0)

    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    class Meta:
        db_table = 'homework_condition'

    def __str__(self):
        return str(self.student_id) + str(self.homework_id) + str(self.status)
