from django.contrib.auth.hashers import BasePasswordHasher
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.crypto import constant_time_compare

import hmac, hashlib

class KohanaPasswordHasher(BasePasswordHasher):
	algorithm = "kohana"
	library = "hmac"
	
	def salt(self):
		return ''

	def encode(self, password, salt):
		hash = hmac.new(settings.KOHANA_SECRET_KEY, force_bytes(password), hashlib.sha256).hexdigest()
		return "%s$%s" % (self.algorithm, hash)	
	
	def verify(self, password, encoded):
		encoded_2 = self.encode(password, '')
		return constant_time_compare(encoded, encoded_2)
	
	def safe_summary(self, encoded):
		return OrderedDict([
			(_('algorithm'), self.algorithm),
			(_('hash'), mask_hash(encoded, show=3)),
		])
			
