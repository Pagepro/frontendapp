from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, UserManager, PermissionsMixin

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
