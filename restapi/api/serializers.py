from rest_framework import serializers
from api.models import *

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('url', 'name', 'short_description', 'long_description', 'repository', 'created_on', 'updated_on')