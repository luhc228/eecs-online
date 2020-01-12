import json
from django.core.paginator import PageNotAnInteger, InvalidPage, EmptyPage, Paginator
from django.shortcuts import HttpResponse

from login.models import User
from student.models import Student, StudentManage, TrueClass


# Create your views here.
def detail(request):
    if request.method == 'GET':
        student_name = request.GET.get('studentName')
        student_id = request.GET.get('studentId')
        student_class = request.GET.get('studentClass')
        student_college = request.GET.get('studentCollege')
        student_gender = request.GET.get('studentGender')
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
        total = student_queryset.count()
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
                'total': total,
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
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        student_queryset = Student.student_manage.filter(deleted=0)
        total = student_queryset.count()
        student_list = student_queryset.values()
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
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
                'total': total,
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


def get(request):
    if request.method == 'GET':
        student_id = request.GET.get('studentId')
        try:
            student = Student.student_manage.get_student(student_id)
            content = {
                'success': True,
                'message': '获取信息成功',
                'data': student
            }
        except:
            content = {
                'success': False,
                'message': '学生用户不存在',
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误',
        }
    return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                        content_type='application/json;charset = utf-8')


def edit(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        student_id = data['studentId']
        student_name = data['studentName']
        student_gender = data['studentGender']
        student_college = data['studentCollege']
        student_class = data['studentClass']
        # password = data['password']
        try:
            # 不允许修改id，也就是账号名
            student = Student.student_manage.student_edit(student_id, student_name, student_college, student_class,
                                                          student_gender)
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
    return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                        content_type='application/json;charset = utf-8')


def list_class(request):
    if request.method == 'GET':
        true_classs = TrueClass.objects.filter(deleted=0)
        class_list = []
        for item in true_classs:
            true_class = {}
            true_class['class'] = item.true_class
            true_class['classId'] = item.id
            class_list.append(true_class)
        content = {
            'success': True,
            'message': '真实班级获取成功',
            'data': {
                'list': class_list,
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


def edit_password(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        student_id = data.get('studentId')
        password = data.get('password')
        try:
            Student.student_manage.get(id=student_id)
            user = User.objects.get(user_id=student_id)
            user.password = password
            user.save()
            content = {
                'success': True,
                'message': '密码修改成功',
            }
        except:
            content = {
                'success': False,
                'message': '学生用户不存在',
            }
        return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        content = {
            'success': False,
            'message': '请求错误',
        }
    return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                        content_type='application/json;charset = utf-8')

