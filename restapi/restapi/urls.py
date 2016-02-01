"""restapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
admin.autodiscover()
#from rest_framework import routers
from rest_framework_nested import routers
from rest_framework.authtoken import views as auth_views
from api import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet, base_name='Project')
router.register(r'accounts', views.UserViewSet, 'list')

project_router = routers.NestedSimpleRouter(router, r'projects', lookup='project')
project_router.register(r'files', views.ProjectFileViewSet, base_name='projectfile')
project_router.register(r'templates', views.ProjectTemplateViewSet, base_name='projecttemplate')
project_router.register(r'tickets', views.ProjectTemplateTicketViewSet, base_name='projectticket')

comments_router = routers.NestedSimpleRouter(project_router, r'tickets', lookup='ticket')
comments_router.register(r'comments', views.ProjectTemplateTicketCommentViewSet, base_name='comments')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include(project_router.urls)),
    url(r'^', include(comments_router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^auth/', auth_views.obtain_auth_token),
]

""" Temp login for testing browsable api """
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]