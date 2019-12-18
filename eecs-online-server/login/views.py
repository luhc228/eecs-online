from django.shortcuts import HttpResponse
import json
from student.models import Student
from teacher.models import Teacher
from login.models import User


# Create your views here.
def teacher(request):
    if request.method == "POST":
        user_id = request.POST.get('teacherId')
        password = request.POST.get('password')
        try:
            teacher = Teacher.objects.get(id=user_id)
            user = User.objects.get(user_id=user_id)
        except:
            con = {
                'success': False,
                'message': '教师用户不存在',
                'data': {
                    'teacherId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):  # 测试用的条件，实际中是模拟爬虫返回一个登陆成功的信息
            con = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'teacherName': teacher.teacher_name,
                    'teacherId': teacher.id,
                    'teacherGender': teacher.teacher_gender,
                    'teacherCollege': teacher.teacher_college,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            con = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'teacherId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    con = {
        'success': False,
        'message': '请求错误',
    }
    return HttpResponse(content=json.dumps(con, ensure_ascii=False), content_type='application/json;charset = utf-8')


def student(request):
    if request.method == "POST":
        user_id = request.POST.get('studentId')
        password = request.POST.get('password')
        try:
            student = Student.objects.get(id=user_id)
            user = User.objects.get(user_id=user_id)
        except:
            con = {
                'success': False,
                'message': '用户不存在',
                'data': {
                    'studentId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):
            con = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'studentName': student.student_name,
                    'studentId': student.id,
                    'studentGender': student.student_gender,
                    'studentCollege': student.student_college,
                    'studentClass': student.student_class,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            con = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'studentId': user_id,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    con = {
        'success': False,
        'message': '请求错误',
    }
    return HttpResponse(content=json.dumps(con, ensure_ascii=False), content_type='application/json;charset = utf-8')
