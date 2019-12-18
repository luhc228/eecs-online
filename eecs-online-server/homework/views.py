import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from homework.models import *
from course.models import *


# Create your views here.
# 调试成功
def paginator_teacher(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        course_id = request.POST.get('courseId')
        if course_id:
            homework_queryset = Homework.homework_manage.filter(course_id=course_id)
        else:
            homework_queryset = Homework.homework_manage.all()
        homework_list = homework_queryset.values()
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
            homeworks.append(homework_dict)
        content = {
            'success': True,
            'message': '作业分页显示成功',
            'data': {
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
def paginator_student(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        course_id = request.POST.get('courseId')
        if course_id:
            homework_queryset = Homework.homework_manage.filter(course_id=course_id)
        else:
            homework_queryset = Homework.homework_manage.all()
        homework_list = homework_queryset.values()
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
            homeworks.append(homework_dict)
        content = {
            'success': True,
            'message': '作业分页显示成功',
            'data': {
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


# 未调试
def add(request):
    if request.method == 'POST':
        course_id = request.POST.get('courseId')
        homework_name = request.POST.get('homeworkName')
        homework_start_at = request.POST.get('startAt')
        homework_end_at = request.POST.get('endAt')
        homework_description = request.POST.get('description')
        homework_score = request.POST.get('homeworkScore')
        homework_question_list = request.POST.get('homeworkQuestionList')
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
                'success': True,
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
    if request.method == 'POST':
        homework_id = request.POST.get('homeworkId')
        try:
            homework = Homework.homework_manage.get_homework(homework_id)
            content = {
                'success': True,
                'message': '课程获取成功',
                'data': {
                    'homework': homework,
                },
            }
        except:
            content = {
                'success': True,
                'message': '课程获取失败',
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
        homework_id = request.POST.get('homeworkId')
        homework_name = request.POST.get('homeworkName')
        homework_start_at = request.POST.get('startAt')
        homework_end_at = request.POST.get('endAt')
        homework_description = request.POST.get('description')
        homework_score = request.POST.get('homeworkScore')
        homework_question_list = request.POST.get('homeworkQuestionList')
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
        homework_id = request.POST.get('homeworkId')  # 获取course_id进行get到对应的课程进行修改课程信息
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
                    'classId': homework_id,
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
def list_course(request):
    if request.method == 'POST':
        course_queryset = Course.course_manage.all()
        course_list = course_queryset.values()
        courses = []
        for i in range(len(course_queryset)):
            course = {}
            course['courseName'] = course_list[i]['course_name']
            course['courseId'] = course_list[i]['id']
            courses.append(course)
        # 返回的课程id和对应的课程名称是按照对应列表存储的
        content = {
            'success': True,
            'message': '课程获取成功',
            'data': {
                'list': courses,
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
