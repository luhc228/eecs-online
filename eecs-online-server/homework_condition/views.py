from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from django.http import HttpResponse

from course.models import Course
from homework.models import HomeworkQuestion, Homework
from homework_condition.models import QuestionCondition
import json
from question_lib.models import QuestionLib
from vir_class.models import VirClass, ClassStudent
from student.models import Student


####################################################
# 还没有写抛出异常
#
####################################################
# Create your views here.
# 调试成功
def question_list(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        homework_id = request.POST.get('homeworkId')
        student_id = request.POST.get('studentId')
        # 通过中间关系表，找到homework对应的question_id，然后到QuetionLib中查找对应题目的详情
        question_id_queryset = HomeworkQuestion.objects.filter(homework_id=homework_id)
        question_list = question_id_queryset.values()
        paginator = Paginator(question_list, int(pagesize))
        try:
            # 获取page，第几个页面
            question_id = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            question_id = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            question_id = paginator.page(paginator.num_pages)
        if QuestionCondition.question_condition_manage.filter(homework_id_id=homework_id, student_id=student_id):
            homework = QuestionCondition.question_condition_manage.question_condition_list(student_id, question_id)
        else:
            con = {
                'success': False,
                'message': '请求错误'
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')

        con = {
            'success': True,
            'message': '题目显示成功',
            'data': {
                'page': page,
                'pageSize': pagesize,
                'list': homework,
            },
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


def answer_save(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            student_id = data['studentId']
            homework_id = data['homeworkId']
            answer_list = data['list']
            QuestionCondition.question_condition_manage.answer_save(student_id, homework_id, answer_list)
            con = {
                'success': True,
                'message': '答案提交成功',
            }
        except:
            con = {
                'success': True,
                'message': '答案提交失败',
                'data': {
                    'courseName': 'default',
                    'courseId': 'default',
                },
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
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
            con = {
                'success': True,
                'message': '答案提交成功',
                'date': {
                    'questionScoreList': score_dict,
                    'homeworkScore': homework_score,
                }
            }
        except:
            con = {
                'success': False,
                'message': '答案提交失败',
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


def paginator(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        course_id = request.POST.get('courseId')
        class_id = request.POST.get('classId')
        homework_id = request.POST.get('homeworkId')  # 这个是固定的
        # 第一步，获取所有学生id
        student_id_queryset = ClassStudent.objects.filter(class_id=class_id)
        student_id_list = student_id_queryset.values()
        paginator = Paginator(student_id_list, int(pagesize))
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
            VirClass.class_manage.get(id=class_id)
            Course.course_manage.get(id=course_id)
            students_homework_condition = QuestionCondition.question_condition_manage.students_homework_condition(
                course_id, class_id, homework_id, student_id)
            con = {
                'success': True,
                'message': '题目显示成功',
                'data': {
                    'page': page,
                    'pageSize': pagesize,
                    'list': students_homework_condition,
                },
            }
        except:
            con = {
                'success': False,
                'message': '班级或者课程不存在'
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
def detail(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        homework_id = request.POST.get('homeworkId')
        student_id = request.POST.get('studentId')
        # 通过中间关系表，找到homework对应的question_id，然后到QuetionLib中查找对应题目的详情
        question_id_queryset = HomeworkQuestion.objects.filter(homework_id=homework_id)
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
            homework = QuestionCondition.question_condition_manage.question_condition_list(student_id, question_id)
            con = {
                'success': True,
                'message': '题目显示成功',
                'data': {
                    'page': page,
                    'pageSize': pagesize,
                    'list': homework,
                },
            }
        except:
            con = {
                'success': False,
                'message': '获取失败'
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
def score_edit(request):
    if request.method == 'POST':
        student_id = request.POST.get('studentId')
        homework_id = request.POST.get('homeworkId')
        score = request.POST.get('questionScore')
        question_id = request.POST.get('questionId')
        try:
            QuestionCondition.question_condition_manage.question_score_edit(student_id, homework_id, question_id, score)
            con = {
                'success': True,
                'message': '题目分数修改成功',
                'date': {
                    'questionScore': score,
                }
            }
        except:
            con = {
                'success': False,
                'message': '题目分数修改失败',
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
