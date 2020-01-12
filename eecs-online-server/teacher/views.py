import json
from django.http import HttpResponse
from teacher.models import Teacher
from login.models import User


# Create your views here.

def get(request):
    if request.method == 'GET':
        teacher_id = request.GET.get('teacherId')
        try:
            teacher = Teacher.teacher_manage.get_teacher(teacher_id)
            content = {
                'success': True,
                'message': '获取信息成功',
                'data': teacher
            }
        except:
            content = {
                'success': False,
                'message': '教师用户不存在',
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
        teacher_id = data['teacherId']
        teacher_name = data['teacherName']
        teacher_gender = data['teacherGender']
        teacher_college = data['teacherCollege']
        # password = data['password']
        try:
            # 不允许修改id，也就是账号名
            teacher = Teacher.teacher_manage.teacher_edit(teacher_id, teacher_name, teacher_college, teacher_gender)
            content = {
                'success': True,
                'message': '教师信息修改成功',
                'data': {
                    'teacherId': teacher_id,
                    'teacherName': teacher_name,
                },
            }
        except:
            content = {
                'success': False,
                'message': '教师用户不存在',
                'data': {
                    'teacherId': teacher_id,
                    'teacherName': teacher_name,
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


def list_college(request):
    colleges = [{0: '信息科学与工程学院'}, {1: '法学院'}, {2: '政治学与公共管理学院'}, {3: '计算机科学与技术学院'},
                {4: '生命科学学院'}, {5: '环境科学与工程学院'}]

    if request.method == 'POST':
        content = {
            'success': True,
            'message': '学院获取成功',
            'data': {
                'list': colleges,
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
        teacher_id = data.get('teacherId')
        password = data.get('password')
        try:
            Teacher.teacher_manage.get(id=teacher_id)
            user = User.objects.get(user_id=teacher_id)
            user.password = password
            user.save()
            content = {
                'success': True,
                'message': '密码修改成功',
            }
        except:
            content = {
                'success': False,
                'message': '教师用户不存在',
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
