from django.shortcuts import render
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from question_lib.models import *
from homework.models import *


# Create your views here.
# 调试成功
# request body 包含：page pageSize homeworkId
def pagination(request):
    if request.method == 'POST':
        page = int(request.POST.get('page'))
        pagesize = request.POST.get('pageSize')
        try:
            questions_list = []
            homework_id = request.POST.get('homeworkId')
            homework = Homework.homework_manage.get(id=homework_id, deleted=0)
            homework_questions = homework.homeworkquestion_set.all()
            homework_questions = homework_questions.values()
            for homework_question in homework_questions:
                questions_list.append(
                    QuestionLib.question_lib_manage.get_question_detail(homework_question['question_lib_id_id']))
            paginator = Paginator(questions_list, int(pagesize))
            try:
                # 获取page，第几个页面
                questions = paginator.page(page)
            # 捕获异常
            except PageNotAnInteger:
                # 如果请求的页数不是整数, 返回第一页。
                questions = paginator.page(1)
                page = 1
            except InvalidPage:
                # 如果请求的页数不存在, 重定向页面
                return HttpResponse('找不到页面的内容')
            except EmptyPage:
                # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
                questions = paginator.page(paginator.num_pages)
            questions = questions.object_list
            con = {
                'success': True,
                'message': '题目分页获取成功',
                'data': {
                    'page': page,
                    'pageSize': pagesize,
                    'list': questions,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            con = {
                'success': False,
                'message': '题目分页获取失败',
                'data': {
                    'page': page,
                    'pageSize': pagesize,
                    'list': None,
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
# request body 包括：questionId
def detail(request):
    if request.method == 'POST':
        question_id = request.POST.get('questionId')
        try:
            detail_question = QuestionLib.question_lib_manage.get_question_detail(question_id)
            con = {
                'success': True,
                'message': '查询成功',
                'questionId': question_id,
                'data': {
                    'detail': detail_question
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            con = {
                'success': False,
                'message': '查询失败',
                'questionId': question_id,
                'data': {
                    'detail': None
                },
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试完毕
# request body 包括：courseId 、unit、 questionType 、content、 contentImage 、options、answer、questionScore
def add(request):
    if request.method == 'POST':
        try:
            dic = {}
            dic['course_id'] = int(request.POST.get('courseId'))
            dic['unit'] = request.POST.get('unit')
            dic['question_type'] = int(request.POST.get('questionType'))
            dic['content'] = request.POST.get('content')
            dic['content_image'] = request.POST.get('contentImage')
            dic['options'] = request.POST.get('options')
            dic['answer'] = request.POST.get('answer')
            dic['question_score'] = request.POST.get('questionScore')
            i = QuestionLib.question_lib_manage.add_question(dic)
            con = {
                'success': True,
                'message': '添加成功',
                'questionId': i
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            con = {
                'success': False,
                'message': '添加失败',
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试成功
# request body 包括：questionId、courseId 、unit、 questionType 、content、 contentImage 、options、answer、questionScore
def update(request):
    if request.method == 'POST':
        dic = {}
        dic['id'] = request.POST.get('questionId')
        dic['course_id'] = request.POST.get('courseId')
        dic['unit'] = request.POST.get('unit')
        dic['question_type'] = request.POST.get('questionType')
        dic['content'] = request.POST.get('content')
        dic['content_image'] = request.POST.get('contentImage')
        dic['options'] = request.POST.get('options')
        dic['answer'] = request.POST.get('answer')
        dic['question_score'] = request.POST.get('questionScore')
        try:
            QuestionLib.question_lib_manage.updata_question(dic)
            con = {
                'success': True,
                'message': '更新成功',
                'questionId': dic['id'],
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            con = {
                'success': False,
                'message': '更新失败',
                'questionId': dic['id'],
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')


# 调试完毕
# request body包括：questionId
def delete(request):
    if request.method == 'POST':
        question_id = request.POST.get('questionId')
        try:
            QuestionLib.question_lib_manage.delete_question(question_id)
            con = {
                'success': True,
                'message': '删除成功',
                'questionId': question_id,
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            con = {
                'success': False,
                'message': '删除失败',
                'questionId': question_id,
            }
            return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
    else:
        con = {
            'success': False,
            'message': '请求错误'
        }
        return HttpResponse(content=json.dumps(con, ensure_ascii=False),
                            content_type='application/json;charset = utf-8')
