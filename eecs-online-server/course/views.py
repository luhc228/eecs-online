import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from course.models import *


# Create your views here.

# 调试成功
def paginator_view(request):
    if request.method == "POST":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        teacher_id = data['teacherId']
        course_name = data.get('courseName')
        location = data.get('location')
        class_name = data.get('className')
        search_dict = {}
        if course_name:
            search_dict['course_name__contains'] = course_name
        if location:
            search_dict['course_location__contains'] = location
        if class_name:
            search_dict['class_id__class_name__contains'] = class_name
        try:
            # 如果不存在该课程则默认返回所有课程
            # Course.course_manage.get(course_name__contains=course_name)
            course_queryset = Course.course_manage.filter(**search_dict, teacher_id=teacher_id)
        except:
            course_queryset = Course.course_manage.filter(teacher_id_id=teacher_id, deleted=0)

        course_list = course_queryset.values()
        total = course_queryset.count()
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
        courses = Course.course_manage.paginator_view(course)
        content = {
            'success': True,
            'message': '分页显示成功',
            'data': {
                'total': total,
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
        data = json.loads(request.body.decode())

        course_name = data['courseName']
        course_location = data['courseLocation']
        # course_time = data['courseTime']
        class_id = data['classId']
        teacher_id = data['teacherId']
        # 创建新课程，一定要先有老师，班级在建立课程
        course = Course.course_manage.creat_course(course_name, course_location, class_id, teacher_id)
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
        data = json.loads(request.body.decode())
        course_id = data['courseId']  # 获取course_id进行get到对应的课程进行修改课程信息
        course_name = data['courseName']
        course_location = data['courseLocation']
        # course_time = data['courseTime']
        class_id = data['classId']
        teacher_id = data['teacherId']
        try:
            course = Course.course_manage.update_course(course_id, course_name, course_location, class_id,
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
        data = json.loads(request.body.decode())
        course_id = data['courseId']  # 获取course_id进行get到对应的课程进行修改课程信息
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
    if request.method == 'GET':
        teacher_id = request.GET.get('teacherId')
        student_id = request.GET.get('studentId')

        course_queryset = Course.course_manage.all()
        if teacher_id:
            course_queryset = course_queryset.filter(teacher_id=teacher_id)
        # 如果该学生不存在就返回教师的
        try:
            if student_id:
                student = Student.student_manage.get(id=student_id)
                vir_classs = student.classstudent_set.all()
                class_id_list = []
                for vir_class in vir_classs:
                    class_id_list.append(vir_class.class_id)
                course_queryset = course_queryset.filter(class_id__in=class_id_list).distinct()
        except:
            course_queryset = course_queryset.filter(teacher_id=teacher_id)
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
