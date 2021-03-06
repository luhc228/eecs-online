import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from vir_class.models import *


# Create your views here.

# 调试成功
def paginator_class(request):
    # 将数据按照规定每页显示 10 条, 进行分割
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        class_name = data.get('className')
        if class_name:
            class_queryset = VirClass.class_manage.filter(class_name__contains=class_name, deleted=0)
        else:
            class_queryset = VirClass.class_manage.all()
        class_list = class_queryset.values()
        total = class_queryset.count()

        paginator = Paginator(class_list, int(pagesize))
        try:
            # 获取page，第几个页面
            vir_class = paginator.page(page)
        # 捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            vir_class = paginator.page(1)
            page = 1
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            vir_class = paginator.page(page - 1)
            page = page - 1
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            vir_class = paginator.page(paginator.num_pages)
        vir_classes = []
        for i in range(len(vir_class.object_list)):
            vir_class_dict = {}
            vir_class_dict['classId'] = vir_class.object_list[i]['id']
            vir_class_dict['className'] = vir_class.object_list[i]['class_name']
            vir_class_dict['studentNum'] = ClassStudent.objects.filter(class_id=vir_class_dict['classId'],
                                                                       deleted=0).count()
            vir_classes.append(vir_class_dict)
        content = {
            'success': True,
            'message': '班级分页获取成功',
            'data': {
                'total': total,
                'page': page,
                'pageSize': pagesize,
                'list': vir_classes,
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
# 新增班级就不需要考虑get判断的时候是否存在deleted的班级了，下面的get需要考虑
def add(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        class_name = data['className']
        student_id_list = data['studentIdList']
        try:
            vir_class = VirClass.class_manage.get(class_name=class_name, deleted=0)
            content = {
                'success': False,
                'message': '班级已经存在',
                'data': {
                    'classId': vir_class.id,
                    'className': vir_class.class_name,
                },
            }
        except:
            # 创建新班级
            vir_class = VirClass.class_manage.creat_class(class_name, student_id_list)
            content = {
                'success': True,
                'message': '新增班级成功',
                'data': {
                    'classId': vir_class.id,
                    'className': vir_class.class_name,
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
def get(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        class_id = data['classId']
        try:
            # 判断是否存在这个班级，而且未被删除
            vir_class = VirClass.class_manage.get(id=class_id, deleted=0)
            # 获取所有班级
            student_list = VirClass.class_manage.get_students(class_id=class_id)
            content = {
                'success': True,
                'message': '获取班级信息成功',
                'data': {
                    'classId': class_id,
                    'className': vir_class.class_name,
                    'studentList': student_list,
                },
            }
        except:
            content = {
                'success': False,
                'message': '不存在该班级',
                'data': {
                    'classId': class_id,
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


# 编辑班级学生信息
def edit(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        class_id = data['classId']
        class_name = data.get('className')
        student_id_list = data['studentIdList']
        try:
            VirClass.class_manage.get(id=class_id, deleted=0)
            name = VirClass.class_manage.edit_class(class_id, class_name, student_id_list)
            content = {
                'success': True,
                'message': '班级信息修改成功',
                'data': {
                    'classId': class_id,
                    'className': name,
                },
            }
        except:
            content = {
                'success': True,
                'message': '不存在该班级',
                'data': {
                    'classId': class_id,
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
        class_id = data['classId']
        try:
            vir_class = VirClass.class_manage.delete(class_id)
            content = {
                'success': True,
                'message': '班级删除成功',
                'data': {
                    'classId': vir_class.id,
                    'className': vir_class.class_name,
                },
            }
        except:
            content = {
                'success': False,
                'message': '不存在该班级',
                'data': {
                    'classId': class_id,
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
def list(request):
    if request.method == 'GET':
        class_queryset = VirClass.class_manage.all()
        total = class_queryset.count()
        class_list = class_queryset.values()
        classes = []
        for i in range(len(class_queryset)):
            vir_class = {}
            vir_class['classId'] = class_list[i]['id']
            vir_class['className'] = class_list[i]['class_name']
            classes.append(vir_class)
        # 返回的课程id和对应的课程名称是按照对应列表存储的
        content = {
            'success': True,
            'message': '班级获取成功',
            'data': {
                'total': total,
                'list': classes,
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


def list_2(request):
    if request.method == 'GET':
        homework_id = request.GET.get('homeworkId')
        if homework_id:
            class_queryset = VirClass.class_manage.filter(course__homework__id=homework_id, deleted=0)
        else:
            class_queryset = VirClass.class_manage.all()
        total = class_queryset.count()
        class_list = class_queryset.values()
        classes = []
        for i in range(len(class_queryset)):
            vir_class = {}
            vir_class['classId'] = class_list[i]['id']
            vir_class['className'] = class_list[i]['class_name']
            classes.append(vir_class)
        # 返回的课程id和对应的课程名称是按照对应列表存储的
        content = {
            'success': True,
            'message': '班级获取成功',
            'data': {
                'total': total,
                'list': classes,
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
