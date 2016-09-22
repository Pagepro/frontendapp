import json

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.exceptions import FieldDoesNotExist

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import list_route, detail_route
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound, ValidationError

from api.serializers import *
from api.models import *
from api.permissions import IsStaffOrTargetUser, IsStaffOrOwner, IsStaffOrClient

class LargeResultsSetPagination(PageNumberPagination):
	page_size = 1000
	page_size_query_param = 'page_size'
	max_page_size = 10000

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10 

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

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
    	filter = self.request.GET.get('filter', None)
    	order = self.request.GET.get('order', 'name')

    	fields = Project._meta

    	try:
    		if order[0] == '-':
    			order_field = order[1:]
    		else:
    			order_field = order

    		fields.get_field(order_field)
    	except FieldDoesNotExist:
    		order = 'name'

    	if (self.request.user.is_superuser or self.request.user.is_staff) and filter == 'active':
    		queryset = Project.objects.filter(connected_users__id=self.request.user.id)
    	elif self.request.user.is_superuser or self.request.user.is_staff:
    		queryset = Project.objects.all()
    	else:
    		queryset = Project.objects.filter(Q(user=self.request.user) | Q(client=self.request.user))
    	#if not self.request.user.is_superuser or (self.request.user.is_superuser and filter == 'active'):
    	#	queryset = Project.objects.filter(Q(user=self.request.user) | Q(client=self.request.user))
    	#else:
    	#	queryset = Project.objects.all()

    	if filter == 'active':
    		return queryset.exclude(status=4).order_by(order)
    	return queryset.order_by(order)

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

# Przepisac na ModelViewSet
class ProjectFileViewSet(viewsets.ModelViewSet):
	queryset = ProjectFile.objects.all()
	serializer_class = ProjectFileSerializer
	parser_classes = (FormParser, MultiPartParser,)

	def list(self, request, project_pk=None):
		queryset = ProjectFile.objects.filter(project=project_pk).filter(status=1).order_by('-uploaded_date')
		serializer = ProjectFileSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

  	def perform_create(self, serializer):
 		uploaded_file = self.request.FILES.get('files', False)

 		if not uploaded_file:
 			raise ValidationError(detail='File field can not be empty.')

 		project = get_object_or_404(Project, pk=self.kwargs['project_pk'])
 		serializer.save(project=project)

 		#try:
 		serializer.instance.upload_file(uploaded_file)
 		#except:
 		#	serializer.instance.delete()

class ProjectTemplateViewSet(viewsets.ModelViewSet):
	queryset = ProjectTemplate.objects.all()
	serializer_class = ProjectTemplateSerializer
	parser_classes = (FormParser, MultiPartParser,)

	def list(self, request, project_pk=None):
		queryset = ProjectTemplate.objects.filter(project=project_pk).exclude(status=2).order_by('order')
		serializer = ProjectTemplateSerializer(queryset, many=True, context={'request': request})
 		return Response(serializer.data)

 	def perform_create(self, serializer):
 		uploaded_file = self.request.FILES.get('files', False)

 		if not uploaded_file:
 			raise ValidationError(detail='File field can not be empty.')

 		project = get_object_or_404(Project, pk=self.kwargs['project_pk'])
 		total_templates = ProjectTemplate.objects.filter(project=project).count()
 		serializer.save(project=project, order=total_templates)

 		work = ProjectTemplateWork()
		work.template = serializer.instance
		work.save()

 		try:
 			serializer.instance.upload_file(uploaded_file)
 		except:
 			work.delete()
 			serializer.instance.delete()

 	def perform_update(self, serializer):
  		uploaded_file = self.request.FILES.get('files', False)

 		template = serializer.instance
  		
  		if uploaded_file:
 			template.upload_file(uploaded_file)

 		comment = self.request.data.get('comments', False)
 		if comment:
 			template.work.comments = comment
 		else:
 			template.work.comments = None
 		template.work.save()

 		serializer.save()

	def get_permissions(self):
  		return (IsAuthenticated(), IsStaffOrClient())

# Tickety
class ProjectTicketViewSet(viewsets.ModelViewSet):
	serializer_class = ProjectTicketSerializer
	pagination_class = SmallResultsSetPagination
	
	def get_queryset(self):
		try:
			proj = Project.objects.get(pk=self.kwargs['project_pk'])
			queryset = ProjectTicket.objects.filter(project=proj).order_by('-created_on')

			if not (self.request.user.is_superuser or self.request.user.is_staff):
				queryset = queryset.filter(Q(user=self.request.user) | Q(person=self.request.user))

			return queryset
		except Project.DoesNotExist:
			raise NotFound()

	def perform_create(self, serializer):
 		uploaded_file = self.request.FILES.get('file', False)
		project = get_object_or_404(Project, pk=self.kwargs['project_pk'])
		serializer.save(user=self.request.user, person=self.request.user, project=project)

 		if uploaded_file:
 			serializer.instance.upload_file(uploaded_file)

  	def perform_update(self, serializer):
		uploaded_file = self.request.FILES.get('file', False)

 		if uploaded_file:
 			serializer.instance.upload_file(uploaded_file)

 		serializer.save()

 	def get_permissions(self):
 		if self.request.method == 'PUT' or self.request.method == 'DELETE':
 			return IsStaffOrOwner(),
 		return IsAuthenticated(),

# Komentarze do ticketow
class ProjectTicketCommentViewSet(viewsets.ModelViewSet):
	serializer_class = ProjectTicketCommentSerializer

	def get_queryset(self):
		try:
			ticket = ProjectTicket.objects.get(pk=self.kwargs['ticket_pk'])
			queryset = ProjectTicketComment.objects.filter(ticket=ticket).order_by('-date')
			return queryset
		except ProjectTicket.DoesNotExist:
			raise NotFound()

 	def perform_create(self, serializer):
 		ticket = get_object_or_404(ProjectTicket, pk=self.kwargs['ticket_pk'])
 		serializer.save(user=self.request.user, ticket=ticket)

 	def get_permissions(self):
 		if self.request.method == 'PUT' or self.request.method == 'DELETE':
 			return IsStaffOrOwner(),
 		return IsAuthenticated(),

	def get_serializer_context(self):
		return {'request': self.request}