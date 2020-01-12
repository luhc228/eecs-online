from django.db import models
from course.models import Course


# Create your models here.


class QuestionLibManage(models.Manager):
    def all(self, deleted=0):  # 重写all()方法
        class_queryset = super().all().filter(deleted=deleted)
        return class_queryset  # 获取所有未删除的题目

    def get_questions(self, questions_id):
        questions = []
        for question_id in questions_id:
            questions.append(QuestionLib.question_lib_manage.get(id=question_id, deleted=0))
        return questions

    def get_question_detail(self, question_id):
        question = QuestionLib.question_lib_manage.get(id=question_id, deleted=0)
        res_question = {}
        res_question['courseId'] = question.course_id_id
        res_question['questionId'] = question.id
        res_question['unit'] = question.unit
        res_question['questionType'] = question.question_type
        res_question['content'] = question.content
        res_question['contentImage'] = question.content_image
        res_question['options'] = question.options
        res_question['answer'] = question.answer
        res_question['questionScore'] = question.question_score
        return res_question

    def add_question(self, dic):
        question = QuestionLib()
        question.course_id_id = dic['course_id']
        question.unit = dic['unit']
        question.question_type = dic['question_type']
        question.content = dic['content']
        if dic['content_image'] != None:
            question.content_image = dic['content_image']
        if dic['options'] != None:
            question.options = dic['options']
        question.answer = dic['answer']
        question.question_score = dic['question_score']
        question.save()
        return question.id

    def updata_question(self, dic):
        question = QuestionLib.question_lib_manage.get(id=dic['id'], deleted=0)
        question.course_id_id = int(dic['course_id'])
        question.unit = dic['unit']
        question.question_type = int(dic['question_type'])
        question.content = dic['content']
        if dic['content_image'] != None:
            question.content_image = dic['content_image']
        if dic['options'] != None:
            question.options = dic['options']
        question.answer = dic['answer']
        question.question_score = dic['question_score']
        question.save()

    def delete_question(self, question_id):
        question = QuestionLib.question_lib_manage.get(id=question_id)
        question.deleted = 1
        question.save()
        homework_questions = question.homeworkquestion_set.all()
        for homework_question in homework_questions:
            homework_question.deleted = 1
            homework_question.save()


# 题库，包含所有的课程的所有题，关联course
class QuestionLib(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey('course.Course', on_delete=models.CASCADE)
    unit = models.CharField(max_length=128, blank=False)
    question_type = models.IntegerField(choices=((0, '单选题'), (1, '多选题'), (2, '判断题'), (3, '编程题')), default=3)
    content = models.TextField(max_length=255, blank=False)
    content_image = models.CharField(max_length=255, blank=True)
    options = models.TextField(max_length=255, blank=True)
    answer = models.CharField(max_length=255, blank=True)
    question_score = models.IntegerField(default=0)
    creat_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deleted = models.IntegerField(choices=((0, '未删除'), (1, '已删除')), default=0)

    question_lib_manage = QuestionLibManage()

    class Meta:
        db_table = 'question_lib'

    def __str__(self):
        return str(self.id)
