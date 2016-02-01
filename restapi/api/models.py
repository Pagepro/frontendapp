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
	uploaded_date = models.DateTimeField()

class ProjectTemplate(models.Model):
	class Meta:
		db_table = 'pfo_project_templates'
		
	project = models.ForeignKey(Project)
	name = models.CharField(max_length=255)
	filename = models.CharField(max_length=255)
	original_filename = models.CharField(max_length=255)
	extension =models.CharField(max_length=10)
	size = models.IntegerField()
	order = models.IntegerField()
	status = models.PositiveSmallIntegerField()
	uploaded_date = models.DateTimeField()

class ProjectTemplateTicketBrowser(models.Model):
	class Meta:
		db_table = 'pfo_project_template_ticket_browsers'

	name = models.CharField(max_length=255)
	order = models.PositiveSmallIntegerField()

class ProjectTemplateTicket(models.Model):
	class Meta:
		db_table = 'pfo_project_template_tickets'

	project = models.ForeignKey(Project)
	template = models.ForeignKey(ProjectTemplate)
	user = models.ForeignKey(User, related_name='ticket_author')
	person = models.ForeignKey(User, related_name='ticket_assignee')
	browsers = models.ManyToManyField(ProjectTemplateTicketBrowser, through='BrowserTicket')
	description = models.TextField()
	attachment = models.TextField()
	screenshot_url = models.TextField()
	status = models.PositiveSmallIntegerField()
	created_on = models.DateTimeField()
	updated_on = models.DateTimeField()

class ProjectTemplateTicketComment(models.Model):
	class Meta:
		db_table = 'pfo_project_template_ticket_comments'

	ticket = models.ForeignKey(ProjectTemplateTicket)
	user = models.ForeignKey(User)
	date = models.DateTimeField(auto_now_add=True)
	content = models.TextField()

class BrowserTicket(models.Model):
	class Meta:
		db_table = 'pfo_browsers_tickets'

	ticket = models.ForeignKey(ProjectTemplateTicket, db_column='pfo_project_template_ticket_id')
	browser = models.ForeignKey(ProjectTemplateTicketBrowser, db_column='pfo_project_template_ticket_browser_id')