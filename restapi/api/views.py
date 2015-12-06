from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from api.serializers import *
from api.models import *

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_on')
    serializer_class = ProjectSerializer

class ProjectFileViewSet(viewsets.ViewSet):
	def list(self, request, project_pk=None):
		queryset = ProjectFile.objects.filter(project=project_pk).order_by('-uploaded_date')
		serializer = ProjectFileSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def retrieve(self, request, pk=None, project_pk=None):
 		queryset = ProjectFile.objects.filter(project=project_pk)
 		file = get_object_or_404(queryset, pk=pk)
 		serializer = ProjectFileSerializer(file, context={'request': request})
 		return Response(serializer.data)

class ProjectTemplateViewSet(viewsets.ViewSet):
	def list(self, request, project_pk=None):
		queryset = ProjectTemplate.objects.filter(project=project_pk).order_by('-uploaded_date')
		serializer = ProjectTemplateSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def retrieve(self, request, pk=None, project_pk=None):
 		queryset = ProjectTemplate.objects.filter(project=project_pk)
 		file = get_object_or_404(queryset, pk=pk)
 		serializer = ProjectTemplateSerializer(file, context={'request': request})
 		return Response(serializer.data)

from django.http import HttpResponse
from django.core import urlresolvers

def show_url_patterns(request):
		patterns = _get_named_patterns()
		r = HttpResponse('URL patterns', content_type = 'text/plain')
		longest = max([len(pair[0]) for pair in patterns])
		for key, value in patterns:
			r.write('%s %s\n' % (key.ljust(longest + 1), value))
		return r

def _get_named_patterns():
		"Returns list of (pattern-name, pattern) tuples"
		resolver = urlresolvers.get_resolver(None)
		patterns = sorted([
			(key, value[0][0][0])
			for key, value in resolver.reverse_dict.items()
			if isinstance(key, basestring)
		])
		return patterns