from django.shortcuts import render
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django.http import HttpResponse
from question_lib.models import *
from homework.models import *


# Create your views here.
# 调试成功
def all(request):
    if request.method == 'GET':
        try:
            course_id = request.GET.get("courseId")
            course_id = int(course_id)
            course = Course.course_manage.get(id=course_id, deleted=0)
            questions_queryset = course.questionlib_set.all()
            questions_queryset = questions_queryset.filter(deleted=0)
            questions_list = questions_queryset.values()
            typeName = ['单选题','多选题', '判断题', '编程题']
            res = []
            for i in range(len(questions_list)):
                res_dic = {}
                res_dic['questionId'] = questions_list[i]['id']
                res_dic['courseId'] = course_id
                res_dic['courseName'] = course.course_name
                res_dic['questionType'] = questions_list[i]['question_type']
                res_dic['questionTypeName'] = typeName[int(res_dic['questionType'])]
                res_dic['questionScore'] = questions_list[i]['question_score']
                res_dic['content'] = questions_list[i]['content']
                res.append(res_dic)
            content = {
                'success': True,
                'message': '题目获取成功',
                'list': res,
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '题目获取失败',
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

    
# request body 包含：page pageSize homeworkId
def pagination(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        page = data['page']
        pagesize = data['pageSize']
        teacher_id = data['teacherId']
        try:
            if 'questionType' in data.keys():
                question_type = data['questionType']
            if 'courseId' in data.keys():
                course_id = data['courseId']
            if 'content' in data.keys():
                content = data['content']
            try:
                course = Course.course_manage.get(id=course_id, deleted=0, teacher_id=teacher_id)
            except:
                content = {
                    'success': True,
                    'message': '未添加题目',
                    'data': {
                        'page': page,
                        'pageSize': pagesize,
                        'list': None,
                    },
                }
                return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                    content_type='application/json;charset = utf-8')
            questions_queryset = course.questionlib_set.all()
            questions_queryset = questions_queryset.filter(deleted=0)
            if 'questionType' in data.keys():
                questions_queryset = questions_queryset.filter(question_type=question_type)
            if 'content' in data.keys():
                questions_queryset = questions_queryset.filter(content__contains=content)
            total = questions_queryset.count()
            questions_list = questions_queryset.values()
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
            res = []
            for i in range(len(questions.object_list)):
                res_dic = {}
                res_dic['questionId'] = questions.object_list[i]['id']
                res_dic['courseName'] = course.course_name
                res_dic['questionType'] = questions.object_list[i]['question_type']
                res_dic['questionScore'] = questions.object_list[i]['question_score']
                res_dic['content'] = questions.object_list[i]['content']
                res_dic['contentImage'] = questions.object_list[i]['content_image']
                res.append(res_dic)
            content = {
                'success': True,
                'message': '题目分页获取成功',
                'data': {
                    'total': total,
                    'page': page,
                    'pageSize': pagesize,
                    'list': res,
                },
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '题目分页获取失败',
                'data': {
                    'page': page,
                    'pageSize': pagesize,
                    'list': None,
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
# request body 包括：questionId
def detail(request):
    if request.method == 'GET':
        question_id = request.GET.get("questionId")
        question_id = int(question_id)
        try:
            detail_question = QuestionLib.question_lib_manage.get_question_detail(question_id)
            content = {
                'success': True,
                'message': '查询成功',
                'questionId': question_id,
                'data': detail_question,
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '查询失败',
                'questionId': question_id,
                'data': {
                    'detail': None
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


# 调试完毕
# request body 包括：courseId 、unit、 questionType 、content、 contentImage 、options、answer、questionScore
def add(request):
    if request.method == 'POST':
        try:
            dic = {}
            data = json.loads(request.body.decode())
            dic['course_id'] = int(data['courseId'])
            dic['unit'] = data['unit']
            dic['question_type'] = int(data['questionType'])
            dic['content'] = data['content']
            if 'contentImage' in data:
                dic['content_image'] = data['contentImage']
            else:
                dic['content_image'] = None
            if 'options' in data:
                dic['options'] = data['options']
            else:
                dic['options'] = None
            dic['answer'] = data['answer']
            dic['question_score'] = data['questionScore']
            i = QuestionLib.question_lib_manage.add_question(dic)
            content = {
                'success': True,
                'message': '添加成功',
                'questionId': i
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '添加失败',
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
# request body 包括：questionId、courseId 、unit、 questionType 、content、 contentImage 、options、answer、questionScore
def update(request):
    if request.method == 'POST':
        dic = {}
        data = json.loads(request.body.decode())
        dic['id'] = data['questionId']
        dic['course_id'] = data['courseId']
        dic['unit'] = data['unit']
        dic['question_type'] = data['questionType']
        dic['content'] = data['content']
        if 'contentImage' in data:
            dic['content_image'] = data['contentImage']
        else:
            dic['content_image'] = None
        if 'options' in data:
            dic['options'] = data['options']
        else:
            dic['options'] = None
        dic['answer'] = data['answer']
        dic['question_score'] = data['questionScore']
        try:
            QuestionLib.question_lib_manage.updata_question(dic)
            content = {
                'success': True,
                'message': '更新成功',
                'questionId': dic['id'],
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '更新失败',
                'questionId': dic['id'],
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


# 调试完毕
# request body包括：questionId
def delete(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        question_id = data['questionId']
        try:
            QuestionLib.question_lib_manage.delete_question(question_id)
            content = {
                'success': True,
                'message': '删除成功',
                'questionId': question_id,
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '删除失败',
                'questionId': question_id,
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
