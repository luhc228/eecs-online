from django.shortcuts import render
from django.http import HttpResponse
import json
from image.models import *


# Create your views here.

def upload(request):
    if request.method == 'POST':
        try:
            img = request.FILES.get('image')
            name = request.POST.get('name')
            img_url = Image.image_manage.upload(img, name)
            content = {
                'success': True,
                'message': '图片上传成功',
                '图片URL地址': img_url,
            }
            return HttpResponse(content=json.dumps(content, ensure_ascii=False),
                                content_type='application/json;charset = utf-8')
        except:
            content = {
                'success': False,
                'message': '图片上传失败',
                '图片URL地址': None,
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
