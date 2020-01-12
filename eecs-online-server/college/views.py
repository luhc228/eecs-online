import json
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


# 调试成功
from college.models import College


def list_college(request):
    # colleges = [{0: '信息科学与工程学院'}, {1: '法学院'}, {2: '政治学与公共管理学院'}, {3: '计算机科学与技术学院'},
    #             {4: '生命科学学院'}, {5: '环境科学与工程学院'}]
    if request.method == 'GET':
        colleges = College.objects.filter(deleted=0)
        colleges_list = []
        for item in colleges:
            college = {}
            college['college'] = item.college
            college['collegeId'] = item.id
            colleges_list.append(college)
        content = {
            'success': True,
            'message': '学院获取成功',
            'data': {
                'list': colleges_list,
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
