from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from django.http import HttpResponse

from course.models import Course
from homework.models import HomeworkQuestion, Homework
from homework_condition.models import QuestionCondition, HomeworkCondition
import json
from question_lib.models import QuestionLib
from vir_class.models import VirClass, ClassStudent
from student.models import Student


# Create your views here.
# 调试成功 api/homework_condition/student/list
def question_condition_list(request):
    if request.method == "GET":
        homework_id = request.GET.get('homeworkId')
        student_id = request.GET.get('studentId')
        # 通过中间关系表，找到homework对应的question_id，然后到QuetionLib中查找对应题目的详情
        question_id_queryset = HomeworkQuestion.objects.filter(homework_id=homework_id, deleted=0)
        total = question_id_queryset.count()
        question_list = question_id_queryset.values()

        if HomeworkCondition.objects.filter(homework_id=homework_id, student_id=student_id):
            homework, homework_score, final_score = QuestionCondition.question_condition_manage.question_condition_list(
                homework_id, student_id, question_list)
        else:
            content = {
                'success': False,
                'message': '获取失败'
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')

        content = {
            'success': True,
            'message': '题目显示成功',
            'data': {
                'total': total,
                'homeworkName': Homework.homework_manage.get(id=homework_id, deleted=0).homework_name,
                'homeworkScore': homework_score,
                'finalScore': final_score,
                'list': homework,
            },
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


def answer_save(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            student_id = data['studentId']
            homework_id = data['homeworkId']
            answer_list = data['list']
            QuestionCondition.question_condition_manage.answer_save(student_id, homework_id, answer_list)
            content = {
                'success': True,
                'message': '答案提交成功',
            }
        except:
            content = {
                'success': True,
                'message': '答案提交失败',
                'data': {
                    'courseName': 'default',
                    'courseId': 'default',
                },
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


def answer_submit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            student_id = data['studentId']
            homework_id = data['homeworkId']
            answer_list = data['list']
            score_dict, homework_score = QuestionCondition.question_condition_manage.answer_submit(student_id,
                                                                                                   homework_id,
                                                                                                   answer_list)
            content = {
                'success': True,
                'message': '答案提交成功',
                'date': {
                    'questionScoreList': score_dict,
                    'homeworkScore': homework_score,
                }
            }
        except:
            content = {
                'success': False,
                'message': '答案提交失败',
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


def paginator(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        course_id = data.get('courseId')
        homework_id = data.get('homeworkId')
        class_id = data.get('classId')
        class_name = data.get('className')
        student_id = data.get('studentId')
        student_name = data.get('studentName')

        search_dict = {}
        if student_id:
            search_dict['student_id__id__contains'] = student_id
        if student_name:
            search_dict['student_id__student_name__contains'] = student_name
        if class_id:
            search_dict['class_id'] = class_id
        if class_name:
            search_dict['class_id__class_name__contains'] = class_name
        # 第一步，获取所有学生id
        student_id_queryset = ClassStudent.objects.filter(**search_dict, class_id__course__id=course_id)
        student_id_list = student_id_queryset.values()
        total = student_id_queryset.count()
        paginator = Paginator(student_id_list, pagesize)
        try:
            # 获取page，第几个页面
            student_id = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            student_id = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            student_id = paginator.page(paginator.num_pages)
        try:
            Course.course_manage.get(id=course_id)
            students_homework_condition = QuestionCondition.question_condition_manage.students_homework_condition(
                course_id, homework_id, student_id)
            content = {
                'success': True,
                'message': '作业显示成功',
                'data': {
                    'total': total,
                    'page': page,
                    'pageSize': pagesize,
                    'list': students_homework_condition,
                },
            }
        except:
            content = {
                'success': False,
                'message': '班级或者课程不存在'
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
def detail(request):
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = 1
        pagesize = 100
        homework_id = request.GET.get('homeworkId')
        student_id = request.GET.get('studentId')
        # 通过中间关系表，找到homework对应的question_id，然后到QuetionLib中查找对应题目的详情
        question_id_queryset = HomeworkQuestion.objects.filter(homework_id=homework_id, deleted=0)
        total = question_id_queryset.count()
        question_list = question_id_queryset.values()
        paginator_1 = Paginator(question_list, int(pagesize))
        try:
            # 获取page，第几个页面
            question_id = paginator_1.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            question_id = paginator_1.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            question_id = paginator_1.page(paginator_1.num_pages)
        try:
            homework, homework_score, final_score, question_score_list = QuestionCondition.question_condition_manage.student_question_conditions(
                homework_id, student_id, question_id)
            content = {
                'success': True,
                'message': '题目显示成功',
                'data': {
                    'total': total,
                    'homeworkId': Homework.homework_manage.get(id=homework_id, deleted=0).id,
                    'homeworkName': Homework.homework_manage.get(id=homework_id, deleted=0).homework_name,
                    'homeworkScore': homework_score,
                    'finalScore': final_score,
                    'studentId': student_id,
                    'studentName': Student.student_manage.get(id=student_id).student_name,
                    'list': homework,
                    'questionScoreList': question_score_list
                },
            }
        except:
            content = {
                'success': False,
                'message': '获取失败'
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
def score_edit(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        student_id = data['studentId']
        homework_id = data['homeworkId']
        score = data['questionScore']
        question_id = data['questionId']
        try:
            QuestionCondition.question_condition_manage.question_score_edit(student_id, homework_id, question_id, score)
            content = {
                'success': True,
                'message': '题目分数修改成功',
                'date': {
                    'questionScore': score,
                }
            }
        except:
            content = {
                'success': False,
                'message': '题目分数修改失败',
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
