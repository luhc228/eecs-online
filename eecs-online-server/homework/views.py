import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from homework.models import *
from course.models import *
from homework_condition.models import QuestionCondition
import time


# Create your views here.


def paginator_teacher(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        teacher_id = data['teacherId']
        course_name = data.get('courseName')
        homework_name = data.get('homeworkName')
        search_dict = {}
        if course_name:
            search_dict['course_id__course_name__contains'] = course_name
        if homework_name:
            search_dict['homework_name__contains'] = homework_name
        homework_queryset = Homework.homework_manage.filter(**search_dict, course_id__teacher_id=teacher_id, deleted=0)
        homework_list = homework_queryset.values()
        total = homework_queryset.count()
        paginator = Paginator(homework_list, int(pagesize))
        try:
            # 获取page，第几个页面
            homework = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            homework = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            homework = paginator.page(paginator.num_pages)
        try:
            homeworks = Homework.homework_manage.homework_teacher(homework)
        except:
            content = {
                'success': False,
                'message': '作业分页显示失败',
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        content = {
            'success': True,
            'message': '作业分页显示成功',
            'data': {
                'total': total,
                'page': page,
                'pageSize': pagesize,
                'list': homeworks,
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


# 调试成功
def add(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        course_id = data['courseId']
        homework_name = data['homeworkName']
        homework_start_at = data['startAt']
        homework_end_at = data['endAt']
        homework_description = data['description']
        homework_score = data['homeworkScore']
        homework_question_list = data['homeworkQuestionList']
        # 创建新作业
        try:
            homework = Homework.homework_manage.creat_homework(course_id, homework_name, homework_start_at,
                                                               homework_end_at, homework_description, homework_score,
                                                               homework_question_list)
            content = {
                'success': True,
                'message': '作业添加成功',
                'data': {
                    'courseName': homework.homework_name,
                    'courseId': homework.id,
                },
            }
        except:
            content = {
                'success': False,
                'message': '作业添加失败',
                'data': {
                    'courseName': homework_name,
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


# 调试成功
def get_homework(request):
    if request.method == 'GET':
        homework_id = request.GET.get('homeworkId')
        try:
            homework = Homework.homework_manage.get_homework(homework_id)
            content = {
                'success': True,
                'message': '作业获取成功',
                'data': {
                    'homework': homework,
                },
            }
        except:
            content = {
                'success': True,
                'message': '作业获取失败',
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
def update(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        homework_id = data['homeworkId']
        homework_name = data['homeworkName']
        homework_start_at = data['startAt']
        homework_end_at = data['endAt']
        homework_description = data['description']
        homework_score = data['homeworkScore']
        homework_question_list = data['homeworkQuestionList']
        try:
            homework = Homework.homework_manage.update_homework(homework_id, homework_name, homework_start_at,
                                                                homework_end_at, homework_description, homework_score,
                                                                homework_question_list)
            content = {
                'success': True,
                'message': '课程修改成功',
                'data': {
                    'courseName': homework_name,
                    'courseId': homework_id,
                },
            }
        except:
            content = {
                'success': True,
                'message': '课程修改失败',
                'data': {
                    'courseName': homework_name,
                    'courseId': homework_id,
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


# 调试成功
def delete(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        homework_id = data['homeworkId']  # 获取course_id进行get到对应的课程进行修改课程信息
        try:
            homework = Homework.homework_manage.delete_homework(homework_id)
            content = {
                'success': True,
                'message': '作业删除成功',
                'data': {
                    'courseId': homework.id,
                    'courseName': homework.homework_name,
                },
            }
        except:
            content = {
                'success': True,
                'message': '不存在该作业',
                'data': {
                    'homeworkId': homework_id,
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


# 调试成功
def paginator_student(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        student_id = data.get('studentId')
        get_homework_status = data.get('status')
        class_list = []
        for class_item in ClassStudent.objects.filter(student_id=student_id):
            class_list.append(int(class_item.class_id_id))
        if 'courseId' in data.keys():
            course_id = int(data['courseId'])
            homework_queryset = Homework.homework_manage.filter(course_id=course_id, deleted=0,
                                                                course_id__class_id__in=class_list).distinct()
        else:
            homework_queryset = Homework.homework_manage.filter(deleted=0,
                                                                course_id__class_id__in=class_list).distinct()
        if 'status' in data.keys():
            homework_queryset = homework_queryset.filter(homeworkcondition__status=get_homework_status,
                                                         homeworkcondition__student_id=student_id, deleted=0)
        homework_list = homework_queryset.values()
        total = homework_queryset.count()
        paginator = Paginator(homework_list, pagesize)
        try:
            # 获取page，第几个页面
            homework = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            homework = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            homework = paginator.page(paginator.num_pages)
        try:
            homeworks = Homework.homework_manage.homework_condition_student(homework, get_homework_status, student_id)
        except:
            content = {
                'success': False,
                'message': '作业分页显示失败',
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        content = {
            'success': True,
            'message': '作业分页显示成功',
            'data': {
                'total': total,
                'page': page,
                'pageSize': pagesize,
                'list': homeworks,
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


def get_homework_question(request):
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = 1
        pagesize = 100
        homework_id = request.GET.get('homeworkId')
        # 通过中间关系表，找到homework对应的question_id，然后到QuetionLib中查找对应题目的详情
        question_id_queryset = HomeworkQuestion.objects.filter(homework_id=homework_id, deleted=0)
        if question_id_queryset:
            total = question_id_queryset.count()
            question_list = question_id_queryset.values()
            paginator = Paginator(question_list, pagesize)
        else:
            content = {
                'success': False,
                'message': '未添加题目'
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
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

        homework_name = Homework.homework_manage.get(id=homework_id).homework_name

        if HomeworkQuestion.objects.filter(homework_id=homework_id, deleted=0):
            single_question_list, multiple_question_list, judge_question_list, program_question_list, homework_score, \
                = Homework.homework_manage.question_list(question_id)
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
                'homeworkScore': homework_score,
                'homeworkName': homework_name,
                'singleQuestionList': single_question_list,
                'multipleQuestionList': multiple_question_list,
                'judgeQuestionList': judge_question_list,
                'programQuestionList': program_question_list,
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
