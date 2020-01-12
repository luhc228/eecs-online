from django.shortcuts import HttpResponse
import json

from college.models import College
from student.models import Student
from teacher.models import Teacher
from login.models import User


# Create your views here.
def teacher(request):
    if request.method == "POST":
        data = json.loads(request.body.decode())
        user_id = data['teacherId']
        password = data['password']
        try:
            teacher = Teacher.teacher_manage.get(id=user_id)
            user = User.objects.get(user_id=user_id)
        except:
            content = {
                'success': False,
                'message': '教师用户不存在',
                'data': {
                    'teacherId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):  # 测试用的条件，实际中是模拟爬虫返回一个登陆成功的信息
            content = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'teacherName': teacher.teacher_name,
                    'teacherId': teacher.id,
                    # 'teacherGender': teacher.teacher_gender,
                    # 'teacherCollege': College.objects.get(id=teacher.teacher_college).college,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            content = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'teacherId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    content = {
        'success': False,
        'message': '请求错误',
    }
    return HttpResponse(content=json.dumps(content, ensure_ascii=False), content_type='application/json;charset = utf-8')


def student(request):
    if request.method == "POST":
        data = json.loads(request.body.decode())
        user_id = data['studentId']
        password = data['password']
        try:
            student = Student.student_manage.get(id=user_id)
            user = User.objects.get(user_id=user_id)
        except:
            content = {
                'success': False,
                'message': '用户不存在',
                'data': {
                    'studentId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):
            content = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'studentName': student.student_name,
                    'studentId': student.id,
                    # 'studentGender': student.student_gender,
                    # 'studentCollege': College.objects.get(id=student.student_college).college,
                    # 'studentClass': student.student_class,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            content = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'studentId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    content = {
        'success': False,
        'message': '请求错误',
    }
    return HttpResponse(content=json.dumps(content, ensure_ascii=False), content_type='application/json;charset = utf-8')
