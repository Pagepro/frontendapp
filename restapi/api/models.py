from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, UserManager, PermissionsMixin


class Project(models.Model):
	name = models.CharField(max_length=255)
	short_description = models.TextField()
	long_description = models.TextField()
	repository = models.TextField()
	created_on = models.DateTimeField()
	updated_on = models.DateTimeField()
	finish_date = models.DateTimeField()
	deadline_date = models.DateTimeField()
	suggested_delivery_date = models.DateTimeField()
	finished = models.PositiveSmallIntegerField()
	status = models.IntegerField()

	class Meta:
		db_table = 'pfo_projects'

"""
class ApiUserManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email')
		user = self.model(
			username = username,
			email = self.normalize_email(email),
		)
		user.set_password(password)
		user.save(using=self._db)
		return user
	
	def create_superuser(self, email, username, password):
		user = self.create_user(email,
			password = password,
			username = username
		)
		user.is_admin = True
		user.is_staff = True
		user.save(using=self._db)
		return user
"""
class ApiUser(AbstractBaseUser):
	username = models.CharField(max_length=32, unique=True)
	email = models.EmailField(max_length=254, unique=True)
	logins = models.IntegerField(default=0)

	is_staff = models.PositiveSmallIntegerField(default=0)
	
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	objects = UserManager()

	class Meta:
		db_table = 'users'
