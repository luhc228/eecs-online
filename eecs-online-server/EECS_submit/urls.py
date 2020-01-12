"""EECS_submit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from login import views

urlpatterns = [
                  path('admin/', admin.site.urls),
                  url('api/login/', include('login.urls')),
                  url('api/register/', include('register.urls')),
                  url('api/course/', include('course.urls')),
                  url('api/vir_class/', include('vir_class.urls')),
                  url('api/student/', include('student.urls')),
                  url('api/teacher/', include('teacher.urls')),
                  url('api/homework/', include('homework.urls')),
                  url('api/homework_condition/', include('homework_condition.urls')),
                  url('api/question_lib/', include('question_lib.urls')),
                  url('api/image', include('image.urls')),
                  url('api/college/', include('college.urls')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
