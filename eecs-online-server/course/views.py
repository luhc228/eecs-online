import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from django.shortcuts import render
from course.models import *


# Create your views here.


def paginator_view(request):
    course_list = Course.course_manage.all()
    # 将数据按照规定每页显示 10 条, 进行分割
    paginator = Paginator(course_list, 10)

    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pagesize')
        course_name = request.POST.get('course_name')
        try:
            books = paginator.page(page)
        # todo: 注意捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            books = paginator.page(1)
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            books = paginator.page(paginator.num_pages)

    template_view = 'page.html'
    return render(request, template_view, {'books': books})


def add(request):
    if request.method == 'POST':
        course_name = request.POST.get('course_name')
        course_location = request.POST.get('course_location')
        course_time = request.POST.get('course_time')
        class_name = request.POST.get('class_name')
        # 测试
        # course_name = '经验分享'
        # course_location = 'EECS'
        # course_time = 'EECS'
        # class_name = '2016崇新学堂'
        # print(course_name)
        # 创建新课程
        course = Course.course_manage.creat_course(course_name, course_location, course_time, class_name)
        con = {
            'success': True,
            'message': '课程添加成功',
            'data': {
                'course_id': course.id
            },
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')


def update(request):
    if request.method == 'POST':
        course_id = request.POST.get('course_id')  # 获取course_id进行get到对应的课程进行修改课程信息
        course_name = request.POST.get('course_name')
        course_location = request.POST.get('course_location')
        course_time = request.POST.get('course_time')
        class_name = request.POST.get('class_name')

        course = Course.course_manage.update_course(course_id, course_name, course_location, course_time, class_name)
        con = {
            'success': True,
            'message': '课程修改成功',
            'data': {
                'course_id': course.id
            },
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')


def delete(request):
    if request.method == 'POST':
        course_id = request.POST.get('course_id')  # 获取course_id进行get到对应的课程进行修改课程信息

        course = Course.course_manage.delete_course(course_id)
        con = {
            'success': True,
            'message': '课程删除成功',
            'data': {
                'course_id': course.id
            },
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')


# def list_course(request):
#     if request.method == 'POST':
#         course_list = Course.course_manage.all()
#         con = {
#             'success': True,
#             'message': '课程获取成功',
#             'data': {
#                 'course_list': course_list
#             },
#         }
#         return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')
#     else:
#         con = {
#             'success': False,
#             'message': '请求错误'
#         }
#         return HttpResponse(content=json.dumps(con), content_type='application/json;charset = utf-8')

def list_course(request):
    course_list = Course.course_manage.all()
    print(course_list.values())
    print(course_list.values()[0])  # 字典
    print(type(course_list.values()[0]))
    con = {
        'success': True,
        'message': '课程获取成功',
        'data': {
            'course_list': course_list
        },
    }
    return HttpResponse(course_list)
