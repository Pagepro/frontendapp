"""
WSGI config for restapi project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application
sys.path.append('/var/www/dev.api.frontendapp.com/restapi/')
sys.path.append('/var/www/dev.api.frontendapp.com')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "restapi.settings")

application = get_wsgi_application()
