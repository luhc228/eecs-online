import json
from django.http import HttpResponse
from student.models import Student
from teacher.models import Teacher
from login.models import User


# Create your views here.

def teacher(request):
    if request.method == 'POST':
        teacher_id = request.POST.get('teacherId')
        teacher_name = request.POST.get('teacherName')
        password = request.POST.get('password')
        try:
            User.objects.get(user_id=teacher_id)
            con = {
                'success': False,
                'message': '用户已存在',
                'data': {
                    'teacherId': teacher_id,
                    'teacherName': teacher_name,
                },
            }
        except:
            # 用户信息
            teacher = Teacher()
            teacher.id = teacher_id
            teacher.teacher_name = teacher_name
            teacher.save()
            # 账号密码
            user = User()
            user.user_id = teacher_id
            user.password = password
            user.save()
            con = {
                'success': True,
                'message': '教师注册成功',
                'data': {
                    'teacherId': teacher_id,
                    'teacherName': teacher_name,
                },
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误',
        }
    return HttpResponse(content=json.dumps(con, ensure_ascii=False), content_type='application/json;charset = utf-8')


def student(request):
    if request.method == 'POST':
        student_id = request.POST.get('studentId')
        student_name = request.POST.get('studentName')
        password = request.POST.get('password')
        try:
            User.objects.get(user_id=student_id)
            con = {
                'success': False,
                'message': '用户已存在',
                'data': {
                    'studentId': student_id,
                    'studentName': student_name,
                },
            }
        except:
            student = Student()
            student.id = student_id
            student.student_name = student_name
            student.save()

            user = User()
            user.user_id = student_id
            user.password = password
            user.save()
            con = {
                'success': True,
                'message': '学生注册成功',
                'data': {
                    'studentId': student_id,
                    'studentName': student_name,
                },
            }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误',
        }
    return HttpResponse(content=json.dumps(con, ensure_ascii=False), content_type='application/json;charset = utf-8')
