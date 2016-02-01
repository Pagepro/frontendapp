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

	class Meta:
		model = Project
		fields = ('id', 'name', 'short_description', 'long_description',
			'repository', 'status', 'thumbnail', 'templates_count', 'created_on', 'updated_on', 'user', 'client')
		read_only_fields = ('user', 'client',)

	def get_thumbnail(self, obj):
		return ProjectTemplateSerializer(ProjectTemplate.objects.filter(project=obj.pk).order_by('uploaded_date').first()).data

	def get_templates_count(self, obj):
		return ProjectTemplate.objects.filter(project=obj.pk).count()

class ProjectTemplateSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTemplate

class ProjectFileSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectFile

class ProjectTemplateTicketSerializer(serializers.ModelSerializer):
	comments_count = serializers.SerializerMethodField()

	class Meta:
		model = ProjectTemplateTicket
		fields = ('id', 'template', 'user', 'person', 'description', 'attachment', 'screenshot_url', 'status', 'created_on', 'comments_count')

	def get_comments_count(self, obj):
		return ProjectTemplateTicketComment.objects.filter(ticket=obj.pk).count()

class ProjectTemplateTicketCommentSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	
	class Meta:
		model = ProjectTemplateTicketComment
		fields = ('id', 'date', 'content', 'ticket', 'user')
		read_only_fields = ('ticket', 'user',)