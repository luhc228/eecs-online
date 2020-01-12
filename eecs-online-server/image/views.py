from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from image.models import *


# Create your views here.

def upload(request):
    if request.method == 'POST':
        try:
            img = request.FILES.get('image')
            img_url = Image.image_manage.upload(img)
            img_url = "http://47.97.215.154:8000" + img_url
            content = {
                'success': True,
                'message': '图片上传成功!',
                'imageUrl': img_url,
            }
            response = HttpResponse(json.dumps(content, ensure_ascii=False))
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
            return response
        except:
            content = {
                'success': False,
                'message': '图片上传失败',
                'imageUrl': None,
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
