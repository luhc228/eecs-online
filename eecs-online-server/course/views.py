import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from course.models import *


# Create your views here.

# 调试成功
def paginator_view(request):
    course_queryset = Course.course_manage.all()
    course_list = course_queryset.values()
    # 将数据按照规定每页显示 10 条, 进行分割
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        paginator = Paginator(course_list, int(pagesize))
        try:
            # 获取page，第几个页面
            course = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            course = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            course = paginator.page(paginator.num_pages)
        courses = []
        for i in range(len(course.object_list)):
            course_dict = {}
            course_dict['courseName'] = course.object_list[i]['course_name']
            course_dict['courseId'] = course.object_list[i]['id']
            course_dict['courseTime'] = course.object_list[i]['course_time']
            course_dict['courseLocation'] = course.object_list[i]['course_location']
            course_dict['class'] = VirClass.class_manage.get(id=course.object_list[i]['class_id_id']).class_name
            course_dict['teacherName'] = Teacher.teacher_manage.get(id=course.object_list[i]['teacher_id']).teacher_name
            courses.append(course_dict)
        content = {
            'success': True,
            'message': '分页显示成功',
            'data': {
                'page': page,
                'pageSize': pagesize,
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


# 调试成功
def add(request):
    if request.method == 'POST':
        course_name = request.POST.get('courseName')
        course_location = request.POST.get('courseLocation')
        course_time = request.POST.get('courseTime')
        class_id = request.POST.get('classId')
        teacher_id = request.POST.get('teacherId')
        # 创建新课程，一定要先有老师，班级在建立课程
        course = Course.course_manage.creat_course(course_name, course_location, course_time, class_id, teacher_id)
        content = {
            'success': True,
            'message': '课程添加成功',
            'data': {
                'courseName': course.course_name,
                'courseId': course.id,
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
def update(request):
    if request.method == 'POST':
        course_id = request.POST.get('courseId')  # 获取course_id进行get到对应的课程进行修改课程信息
        course_name = request.POST.get('courseName')
        course_location = request.POST.get('courseLocation')
        course_time = request.POST.get('courseTime')
        class_id = request.POST.get('classId')
        teacher_id = request.POST.get('teacherId')
        try:
            course = Course.course_manage.update_course(course_id, course_name, course_location, course_time, class_id,
                                                        teacher_id)
            content = {
                'success': True,
                'message': '课程修改成功',
                'data': {
                    'courseName': course_name,
                    'courseId': course.id,
                },
            }
        except:
            content = {
                'success': True,
                'message': '课程不存在',
                'data': {
                    'courseName': course_name,
                    'courseId': course_id,
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
        course_id = request.POST.get('courseId')  # 获取course_id进行get到对应的课程进行修改课程信息
        try:
            course = Course.course_manage.delete_course(course_id)
            content = {
                'success': True,
                'message': '课程删除成功',
                'data': {
                    'courseId': course.id,
                    'courseName': course.course_name,
                },
            }
        except:
            content = {
                'success': True,
                'message': '不存在该课程',
                'data': {
                    'classId': course_id,
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
