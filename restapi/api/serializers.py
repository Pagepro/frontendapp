import re
from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework_nested.relations import NestedHyperlinkedRelatedField

from api.models import *

# User Endpoint
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
		extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }        
		read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)
	
	def create(self, validated_data):
		user = User.objects.create(**validated_data)
		user.set_password(validated_data['password'])
		user.save()

		return user

class ProjectSerializer(serializers.ModelSerializer):
	thumbnail = serializers.SerializerMethodField()
	templates_count = serializers.SerializerMethodField()
	progress = serializers.SerializerMethodField()

	class Meta:
		model = Project
		fields = ('id', 'name', 'short_description', 'long_description',
			'repository', 'status', 'created_on', 'updated_on', 'user', 'client',
			 'thumbnail', 'templates_count', 'progress')
		read_only_fields = ('user', 'client',)

	def get_thumbnail(self, obj):
		return ProjectTemplateSerializer(obj.get_thumbnail(), context=self.context).data

	def get_templates_count(self, obj):
		return obj.get_templates_count()

	def get_progress(self, obj):
		return obj.get_progress()

class ProjectTemplateSerializer(serializers.ModelSerializer):
	tickets_count = serializers.SerializerMethodField()
	fullimage_url = serializers.SerializerMethodField()	
	html_url = serializers.SerializerMethodField()
	status = serializers.SerializerMethodField()
	work = serializers.SerializerMethodField()

	class Meta:
		model = ProjectTemplate
		read_only_fields = ('original_filename', 'size', 'order', 'extension', 'filename', 'project',
			'fullimage_url', 'tickets_count', 'html_url', 'status', 'work')

	def get_tickets_count(self, obj):
		request = self.context['request']
		return obj.get_tickets_count(request.user)

	def get_fullimage_url(self, obj):
		return obj.get_fullimage_url()

	def get_html_url(self, obj):
		try:
			return obj.work.get_login_password_url()
		except ProjectTemplateWork.DoesNotExist:
			return None

	def get_status(self, obj):
		try:
			return obj.work.work_status
		except ProjectTemplateWork.DoesNotExist:
			return None

	def get_work(self, obj):
		try:
			return ProjectTemplateWorkSerializer(obj.work).data
		except ProjectTemplateWork.DoesNotExist:
			return None

class ProjectFileSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectFile
		read_only_fields = ('original_filename', 'size', 'order', 'extension', 'filename', 'project','status')

class ProjectTemplateWorkSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTemplateWork

class ProjectTicketSerializer(serializers.ModelSerializer):
	comments_count = serializers.SerializerMethodField()
	author = serializers.SerializerMethodField()
	assignee = serializers.SerializerMethodField()
	related_template = serializers.SerializerMethodField()
	available_templates = serializers.SerializerMethodField()
	html_description = serializers.SerializerMethodField()
	can_delete = serializers.SerializerMethodField()

	class Meta:
		model = ProjectTicket
		fields = ('id', 'created_on', 'updated_on', 'author', 'assignee', 'status', 'description', 'html_description', 'browsers',
			'comments_count', 'attachment', 'screenshot_url', 'template', 'person', 'related_template', 'available_templates', 'can_delete')
		extra_kwargs = {
			'person': {
				'write_only': True,
			},
			'template': {
				'write_only': True,
			}
		}  

	def get_comments_count(self, obj):
		return ProjectTicketComment.objects.filter(ticket=obj.pk).count()

	def get_author(self, obj):
		return UserSerializer(obj.user).data

	def get_assignee(self, obj):
		try:
			assignee = User.objects.get(pk=obj.person.pk)
			return UserSerializer(assignee).data
		except:
			return None

	def get_html_description(self, obj):
		urls = re.compile(r"((https?):((//)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)", re.MULTILINE|re.UNICODE)

		value = urls.sub(r'<a href="\1" target="_blank">\1</a>', obj.description)
		urls = re.compile(r"([\w\-\.]+@(\w[\w\-]+\.)+[\w\-]+)", re.MULTILINE|re.UNICODE)
		value = urls.sub(r'<a href="mailto:\1">\1</a>', value)
		value = value.replace('\n','<br />')
		return value

	def get_related_template(self, obj):
		#try:
			template = ProjectTemplate.objects.get(pk=obj.template.pk)
			return ProjectTemplateSerializer(template, context=self.context).data
		#except:
		#	return None

	def get_available_templates(self, obj):
		templates = ProjectTemplate.objects.filter(project=obj.project).exclude(status=2).order_by('-uploaded_date')
		return ProjectFileSerializer(templates, many=True).data

	def get_can_delete(self, obj):
		request = self.context['request']
		return request.user.is_staff or request.user.is_superuser or request.user == obj.user

class ProjectTicketCommentSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	can_delete = serializers.SerializerMethodField()
	html_content = serializers.SerializerMethodField()
	
	class Meta:
		model = ProjectTicketComment
		fields = ('id', 'date', 'content', 'html_content', 'ticket', 'user', 'can_delete')
		read_only_fields = ('ticket', 'user',)

	def get_can_delete(self, obj):
		request = self.context['request']
		return request.user.is_staff or request.user.is_superuser or request.user == obj.user

	def get_html_content(self, obj):
		urls = re.compile(r"((https?):((//)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)", re.MULTILINE|re.UNICODE)

		value = urls.sub(r'<a href="\1" target="_blank">\1</a>', obj.content)
		urls = re.compile(r"([\w\-\.]+@(\w[\w\-]+\.)+[\w\-]+)", re.MULTILINE|re.UNICODE)
		value = urls.sub(r'<a href="mailto:\1">\1</a>', value)
		value = value.replace('\n','<br />')
		return value