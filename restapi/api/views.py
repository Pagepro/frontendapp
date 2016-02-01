import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import list_route, detail_route
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination

from api.serializers import *
from api.models import *
from api.permissions import IsStaffOrTargetUser, IsStaffOrOwner

class LargeResultsSetPagination(PageNumberPagination):
	page_size = 1000
	page_size_query_param = 'page_size'
	max_page_size = 10000

# User Endpoint
class UserViewSet(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()

	@list_route()
	def my(self, request):
		if not request.user.is_authenticated():
			return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_403_FORBIDDEN)

		account = User.objects.get(pk=request.user.id)
		serializer = UserSerializer(account, context={'request': request})
		return Response(serializer.data)

	def get_permissions(self):
		return (AllowAny() if self.request.method == 'POST'
			else IsStaffOrTargetUser()),

# Project endpoint
class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
    	filter = self.request.GET.get('filter', None)
    	queryset = Project.objects.filter(Q(user=self.request.user) | Q(client=self.request.user))

    	if filter == None or filter == 'active':
    		return queryset.exclude(status=4).order_by('-created_on')
    	return queryset.order_by('-created_on')

    def perform_create(self, serializer):
    	serializer.save(user=self.request.user, client=self.request.user)

    @detail_route(methods=['post'])
    def set_order(self, request, pk=None):
    	project = get_object_or_404(Project, pk=pk)
    	if self.request.user != project.user and self.request.user != project.client and not request.user.is_staff:
    		return Response(status=status.HTTP_403_FORBIDDEN)

    	orders = json.loads(request.body)
    	order = 0
    	for i in orders:
    		template = ProjectTemplate.objects.get(pk=i)
    		template.order = order
    		template.save()
    		order += 1

    	return Response(status=status.HTTP_200_OK)

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

class ProjectTemplateViewSet(viewsets.ModelViewSet):
	queryset = ProjectTemplate.objects.all()
	serializer_class = ProjectTemplateSerializer

	def list(self, request, project_pk=None):
		queryset = ProjectTemplate.objects.filter(project=project_pk).order_by('order')
		serializer = ProjectTemplateSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def retrieve(self, request, pk=None, project_pk=None):
 		queryset = ProjectTemplate.objects.filter(project=project_pk)
 		file = get_object_or_404(queryset, pk=pk)
 		serializer = ProjectTemplateSerializer(file, context={'request': request})
 		return Response(serializer.data)

 	def destroy(self, request, pk=None, project_pk=None):
 		queryset = ProjectTemplate.objects.filter(project=project_pk)
 		template = get_object_or_404(queryset, pk=pk)
 		template.delete()
 		return Response(status=status.HTTP_200_OK)

 	def perform_create(self, serializer):
 		project = get_object_or_404(Project, pk=self.kwargs['project_pk'])
 		serializer.save(project=project)

  	def get_permissions(self):
 		if self.request.method == 'DELETE':
 			return IsStaffOrOwner(),
 		return IsAuthenticated(),	

class ProjectTemplateTicketViewSet(viewsets.ViewSet):
	def list(self, request, project_pk=None):
		queryset = ProjectTemplateTicket.objects.filter(project=project_pk).order_by('-created_on')
		serializer = ProjectTemplateTicketSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def retrieve(self, request, pk=None, project_pk=None):
 		queryset = ProjectTemplateTicket.objects.filter(project=project_pk)
 		ticket = get_object_or_404(queryset, pk=pk)
 		serializer = ProjectTemplateTicketSerializer(ticket, context={'request': request})
 		return Response(serializer.data)

# Komentarze do ticketow
class ProjectTemplateTicketCommentViewSet(viewsets.ModelViewSet):
	queryset = ProjectTemplateTicketComment.objects.all()
	serializer_class = ProjectTemplateTicketCommentSerializer

	def list(self, request, project_pk=None, ticket_pk=None):
		queryset = ProjectTemplateTicketComment.objects.filter(ticket=ticket_pk).order_by('-date')
		serializer = ProjectTemplateTicketCommentSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def retrieve(self, request, pk=None, project_pk=None, ticket_pk=None):
 		queryset = ProjectTemplateTicketComment.objects.filter(ticket=ticket_pk)
 		comment = get_object_or_404(queryset, pk=pk)
 		serializer = ProjectTemplateTicketCommentSerializer(comment, context={'request': request})
 		return Response(serializer.data)

  	def destroy(self, request, pk=None, project_pk=None, ticket_pk=None):
 		queryset = ProjectTemplateTicketComment.objects.filter(pk=pk)
 		ticket = get_object_or_404(queryset, pk=pk)
 		ticket.delete()
 		return Response(status=status.HTTP_200_OK)

 	def update(self, request, pk=None, project_pk=None, ticket_pk=None):
		queryset = ProjectTemplateTicketComment.objects.filter(pk=pk)
 		ticket = get_object_or_404(queryset, pk=pk)

 		serializer = ProjectTemplateTicketCommentSerializer(ticket, data=request.data)
 		if serializer.is_valid():
 			serializer.save()
 			return Response(serializer.data)
 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 	def perform_create(self, serializer):
 		ticket = get_object_or_404(ProjectTemplateTicket, pk=self.kwargs['ticket_pk'])
 		serializer.save(user=self.request.user, ticket=ticket)

 	def get_permissions(self):
 		if self.request.method == 'PUT' or self.request.method == 'DELETE':
 			return IsStaffOrOwner(),
 		return IsAuthenticated(),