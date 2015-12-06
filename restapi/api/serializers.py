from rest_framework import serializers
from rest_framework_nested.relations import NestedHyperlinkedRelatedField
from api.models import *

class ProjectSerializer(serializers.ModelSerializer):
	files = serializers.HyperlinkedIdentityField(view_name='projectfile-list', lookup_url_kwarg='project_pk')
	templates = serializers.HyperlinkedIdentityField(view_name='projecttemplate-list', lookup_url_kwarg='project_pk')
	class Meta:
		model = Project
		fields = ('url', 'name', 'short_description', 'long_description', 'repository', 'created_on', 'updated_on', 'files', 'templates')

class TemplateFileSerializer(serializers.ModelSerializer):
	class Meta:
		model = TemplateFile

class ProjectFileSerializer(serializers.ModelSerializer):
	#url = NestedHyperlinkedRelatedField(read_only=True,view_name='projectfile-detail', lookup_url_kwarg='project_pk')
	class Meta:
		model = ProjectFile