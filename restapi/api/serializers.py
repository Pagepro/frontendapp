from rest_framework import serializers
from rest_framework_nested.relations import NestedHyperlinkedRelatedField
from api.models import *

class ProjectSerializer(serializers.ModelSerializer):
	files = serializers.HyperlinkedIdentityField(view_name='projectfile-list', lookup_url_kwarg='project_pk')
	templates = serializers.HyperlinkedIdentityField(view_name='projecttemplate-list', lookup_url_kwarg='project_pk')
	class Meta:
		model = Project
		fields = ('id', 'name', 'short_description', 'long_description', 'repository', 'created_on', 'updated_on', 'files', 'templates')

class ProjectTemplateSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTemplate

class ProjectFileSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectFile