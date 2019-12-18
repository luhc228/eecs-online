import json
from django.core.paginator import PageNotAnInteger, InvalidPage, EmptyPage, Paginator
from django.shortcuts import HttpResponse
from student.models import Student, StudentManage


# Create your views here.
def detail(request):
    if request.method == 'POST':
        student_name = request.POST.get('studentName')
        student_id = request.POST.get('studentId')
        student_class = request.POST.get('studentClass')
        student_college = request.POST.get('studentCollege')
        student_gender = request.POST.get('studentGender')
        search_dict = {}
        if student_name:
            search_dict['student_name'] = student_name
        if student_id:
            search_dict['id'] = student_id
        if student_class:
            search_dict['student_class'] = student_class
        if student_college:
            search_dict['student_college'] = student_college
        if student_gender:
            search_dict['student_gender'] = student_gender
        # 多条件filter
        student_queryset = Student.student_manage.filter(**search_dict)
        student_list = student_queryset.values()
        students = []
        for i in range(len(student_queryset)):
            student_dict = {}
            student_dict['studentId'] = student_list[i]['id']
            student_dict['studentName'] = student_list[i]['student_name']
            student_dict['studentGender'] = student_list[i]['student_gender']
            student_dict['studentCollege'] = student_list[i]['student_college']
            student_dict['studentClass'] = student_list[i]['student_class']
            students.append(student_dict)
        content = {
            'success': True,
            'message': '学生信息获取成功',
            'data': {
                'list': students,
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


def paginator_student(request):
    student_queryset = Student.student_manage.filter(deleted=0)
    student_list = student_queryset.values()
    # 将数据按照规定每页显示 10 条, 进行分割
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.POST.get('page')
        pagesize = request.POST.get('pageSize')
        paginator = Paginator(student_list, int(pagesize))
        try:
            # 获取page，第几个页面
            student = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            student = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            student = paginator.page(paginator.num_pages)
        students = []
        for i in range(len(student.object_list)):
            student_dict = {}
            student_dict['studentId'] = student.object_list[i]['id']
            student_dict['studentName'] = student.object_list[i]['student_name']
            student_dict['studentGender'] = student.object_list[i]['student_gender']
            student_dict['studentCollege'] = student.object_list[i]['student_college']
            student_dict['studentClass'] = student.object_list[i]['student_class']
            students.append(student_dict)
        content = {
            'success': True,
            'message': '学生分页获取成功',
            'data': {
                'page': page,
                'pageSize': pagesize,
                'list': students,
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


def edit(request):
    if request.method == 'POST':
        student_id = request.POST.get('studentId')
        student_name = request.POST.get('studentName')
        student_gender = request.POST.get('studentGender')
        student_college = request.POST.get('studentCollege')
        student_class = request.POST.get('studentClass')
        password = request.POST.get('password')
        try:
            # 不允许修改id，也就是账号名
            student = Student.student_manage.student_edit(student_id, student_name, student_college, student_class,
                                                          student_gender, password)
            content = {
                'success': True,
                'message': '学生信息修改成功',
                'data': {
                    'studentId': student_id,
                    'studentName': student_name,
                },
            }
        except:
            content = {
                'success': False,
                'message': '学生用户不存在',
                'data': {
                    'studentId': student_id,
                    'studentName': student_name,
                },
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误',
        }
    return HttpResponse(content=json.dumps(content, ensure_ascii=False), content_type='application/json;charset = utf-8')
