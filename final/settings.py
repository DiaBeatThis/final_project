import os
from .secrets import SECRET_KEY, DATABASES
import dj_database_url

# SECRET_KEY = os.environ['SECRET_KEY']
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', 'diabeatthis.herokuapp.com']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'diabeatthis.apps.DiabeatthisConfig',
    'rest_framework',
	'fitapp',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.AllowAny',),
    'PAGE_SIZE': 100
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'final.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'final.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'EST'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# DATABASES = {
#     'default': {
#     }
# }
#
# db_from_env = dj_database_url.config(conn_max_age=500)
#
# DATABASES['default'].update(db_from_env)
# DATABASES['default'] =  dj_database_url.config()

LOGIN_REDIRECT_URL = '/home/'

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))
STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, '../diabeatthis/static/'),
)

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

MEDIA_URL = '/images/'
MEDIA_ROOT = os.path.join(PROJECT_PATH, 'diabeatthis/static/')

FITAPP_CONSUMER_KEY = '22878M'
FITAPP_CONSUMER_SECRET = '78b76ef60444570d55e8758098c8dc8b'
FITAPP_LOGIN_REDIRECT = "/profile/"
