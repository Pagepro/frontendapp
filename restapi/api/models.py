from __future__ import division

import base64
import uuid
import mimetypes
import magic
import os.path

from django.db import models
from django.contrib.auth.models import User

# Model projektu
class Project(models.Model):
	class Meta:
		db_table = 'pfo_projects'

	name = models.CharField(max_length=255)
	short_description = models.TextField(blank=True, null=True)
	long_description = models.TextField(blank=True, null=True)
	repository = models.TextField(blank=True, null=True)
	created_on = models.DateTimeField(auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True)
	finish_date = models.DateTimeField()
	deadline_date = models.DateTimeField()
	suggested_delivery_date = models.DateTimeField(blank=True)
	finished = models.PositiveSmallIntegerField(default=0)
	status = models.PositiveSmallIntegerField(default=1)

	user = models.ForeignKey(User, related_name='author')
	client = models.ForeignKey(User, related_name='client', blank=True, null=True)

	def get_thumbnail(self):
		return ProjectTemplate.objects.filter(project=self.pk).order_by('uploaded_date').first()

	def get_templates_count(self):
		return ProjectTemplate.objects.filter(project=self.pk).count()

	def get_progress(self):
		active_templates = ProjectTemplate.objects.filter(project=self.pk).filter(status=1).count()

		if active_templates == 0:
			return 0.0

		templates_progress = 0
		templates = ProjectTemplate.objects.filter(project=self.pk).filter(status=1)
		for template in templates:
			if template.work.work_status == 3 or template.work.work_status ==  5:
				templates_progress += 1

		return round((templates_progress / active_templates) * 100)

# Pliki uploadowane do projektu
class ProjectFile(models.Model):
	class Meta:
		db_table = 'pfo_project_files'

	project = models.ForeignKey(Project)
	name = models.CharField(max_length=255)
	filename = models.CharField(max_length=255)
	original_filename = models.CharField(max_length=255)
	extension =models.CharField(max_length=10)
	size = models.IntegerField()
	order = models.IntegerField()
	status = models.PositiveSmallIntegerField()
	uploaded_date = models.DateTimeField(auto_now_add=True)

# Templatki uploadowane do projektu
class ProjectTemplate(models.Model):
	class Meta:
		db_table = 'pfo_project_templates'
		
	project = models.ForeignKey(Project)
	name = models.CharField(max_length=255)
	filename = models.CharField(max_length=255)
	original_filename = models.CharField(max_length=255)
	extension = models.CharField(max_length=10)
	size = models.IntegerField(default=0)
	order = models.IntegerField(default=0)
	status = models.PositiveSmallIntegerField(default=0)
	uploaded_date = models.DateTimeField(auto_now_add=True)

	def get_fullimage_url(self):
		return 'http://frontendapp.com/uploads/' + self.filename

	def upload_file(self, uploaded_file):
		filename = base64.urlsafe_b64encode(uuid.uuid4().bytes).replace('=', '')
 		extension = mimetypes.MimeTypes().types_map_inv[1][
 			magic.from_buffer(uploaded_file.read(), mime=True)
		][0]

 		self.original_filename = uploaded_file.name
		self.size = uploaded_file.size
		self.filename = filename + extension
		self.extension = extension[1:]

		with open('/var/www/frontendapp/uploads/' + filename + extension, 'wb+') as destination:
			for chunk in uploaded_file.chunks():
				destination.write(chunk)

		self.save()

class ProjectTemplateWork(models.Model):
	class Meta:
		db_table = 'pfo_project_template_works'

	template = models.OneToOneField(
        ProjectTemplate,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='work'
    )
	public_url = models.CharField(max_length=255)
	estimation = models.IntegerField(default=0)
	date_start = models.DateTimeField()
	date_end = models.DateTimeField()
	work_status = models.PositiveSmallIntegerField(default=1)
	comments = models.TextField(blank=True, null=True)

	def get_login_password_url(self):
		if self.public_url:
			prefixes = ['http', 'https']
			for prefix in prefixes:
				self.public_url = self.public_url.replace(prefix + '://', '')
			return 'http://login:frontend@' + self.public_url

		return None

class ProjectTicketBrowser(models.Model):
	class Meta:
		db_table = 'pfo_project_template_ticket_browsers'

	name = models.CharField(max_length=255)
	order = models.PositiveSmallIntegerField()

class ProjectTicket(models.Model):
	class Meta:
		db_table = 'pfo_project_template_tickets'

	project = models.ForeignKey(Project)
	template = models.ForeignKey(ProjectTemplate, default=-1)
	user = models.ForeignKey(User, related_name='ticket_author')
	person = models.ForeignKey(User, related_name='ticket_assignee')
	#browsers = models.ManyToManyField(ProjectTicketBrowser, through='BrowserTicket')
	browsers = models.TextField()
	description = models.TextField()
	attachment = models.TextField(blank=True, null=True)
	screenshot_url = models.TextField(blank=True, null=True)
	status = models.PositiveSmallIntegerField(default=1)
	created_on = models.DateTimeField(auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True)

	def upload_file(self, uploaded_file):
		filename = base64.urlsafe_b64encode(uuid.uuid4().bytes).replace('=', '')
 		extension = mimetypes.MimeTypes().types_map_inv[1][
 			magic.from_buffer(uploaded_file.read(), mime=True)
		][0]

		self.attachment = filename + extension

		dir = os.path.dirname('/var/www/frontendapp/uploads/ticket/' + str(self.pk) + '/')
		if not os.path.exists(dir):
			os.makedirs(dir)

		with open(dir + '/' + filename + extension, 'wb+') as destination:
			for chunk in uploaded_file.chunks():
				destination.write(chunk)

		self.save()

class ProjectTicketComment(models.Model):
	class Meta:
		db_table = 'pfo_project_template_ticket_comments'

	ticket = models.ForeignKey(ProjectTicket)
	user = models.ForeignKey(User)
	date = models.DateTimeField(auto_now_add=True)
	content = models.TextField()

class BrowserTicket(models.Model):
	class Meta:
		db_table = 'pfo_browsers_tickets'

	ticket = models.ForeignKey(ProjectTicket, db_column='pfo_project_template_ticket_id')
	browser = models.ForeignKey(ProjectTicketBrowser, db_column='pfo_project_template_ticket_browser_id')