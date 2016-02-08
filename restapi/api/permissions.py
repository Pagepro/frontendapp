from rest_framework import permissions
from api.models import Project

class IsStaffOrTargetUser(permissions.BasePermission):
	def has_permission(self, request, view):
		return view.action == 'retrieve' or view.action == 'my' or request.user.is_staff
 
 	def has_object_permission(self, request, view, obj):
 		return request.user.is_staff or obj == request.user

class IsStaffOrOwner(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		return request.user.is_staff or obj.user == request.user

class IsStaffOrClient(permissions.BasePermission):
	def has_permission(self, request, view):
		project = Project.objects.get(pk=view.kwargs['project_pk'])
		return request.user.is_staff or project.client == request.user or project.user == request.user

	def has_object_permission(self, request, view, obj):
		project = Project.objects.get(pk=view.kwargs['project_pk'])
		return request.user.is_staff or project.client == request.user or project.user == request.user