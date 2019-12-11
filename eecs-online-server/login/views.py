from django.shortcuts import render, redirect
from django.shortcuts import HttpResponse
from login.models import *
import json


# Create your views here.


def teacher(request):
    if request.method == "POST":
        userId = request.POST.get('userId')
        password = request.POST.get('password')
        try:
            user = Teacher.objects.get(id=str(userId))
        except:
            con = {
                'success': False,
                'message': '教师用户不存在',
                'data': {
                    'teacherId': 'userId',
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):  # 测试用的条件，实际中是模拟爬虫返回一个登陆成功的信息
            con = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'teacher_name': user.teacher_name,
                    'teacher_id': user.id,
                    'teacher_gender': user.gender,
                    'teacher_college': user.teacher_college,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            con = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'teacherId': 'userId',
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
        userId = request.POST.get('userId')
        password = request.POST.get('password')
        try:
            user = Student.objects.get(id=str(userId))
        except:
            con = {
                'success': False,
                'message': '用户不存在',
                'data': {
                    'studentId': 'userId',
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        if user.password == str(password):
            con = {
                'success': True,
                'message': '登陆成功',
                'data': {
                    'student_name': user.student_name,
                    'student_id': user.id,
                    'student_gender': user.gender,
                    'student_college': user.student_college,
                    'student_class': user.student_class,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        else:
            con = {
                'success': False,
                'message': '密码不正确',
                'data': {
                    'studentId': 'userId',
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    con = {
        'success': False,
        'message': '请求错误',
    }
    return HttpResponse(content=json.dumps(con, ensure_ascii=False), content_type='application/json;charset = utf-8')
