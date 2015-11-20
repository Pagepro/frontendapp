from rest_framework import viewsets
from api.serializers import *
from api.models import *

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_on')
    serializer_class = ProjectSerializer