"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-b*clcs12p*h9du7=pawx9na)p4v%!^h%lu#qxt^-vo0av!y=_o"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

DEV_APPS = [
    'django_seed',
]

# Application definition
THIRD_PARTY_APPS = [
    'drf_spectacular',
    'drf_yasg',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'strawberry.django',
    'strawberry_django_jwt.refresh_token',
    'django_celery_results',
    'corsheaders',
    'django_prometheus',
]

LOCAL_APPS = [
    'api',
    'common',
    'products',
    'kakaopay',
    'purchase',
    'user',
    'cart',
]


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
] + THIRD_PARTY_APPS + LOCAL_APPS + DEV_APPS


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = "/static/"
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'staticfiles')
# ]


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = "/media/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = 'user.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'common.paginations.CustomPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=720),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    # "ROTATE_REFRESH_TOKENS": False,
    # "BLACKLIST_AFTER_ROTATION": False,
    # "UPDATE_LAST_LOGIN": False,

    # "ALGORITHM": "HS256",
    # "SIGNING_KEY": SECRET_KEY,
    # "VERIFYING_KEY": "",
    # "AUDIENCE": None,
    # "ISSUER": None,
    # "JSON_ENCODER": None,
    # "JWK_URL": None,
    # "LEEWAY": 0,

    # "AUTH_HEADER_TYPES": ("Bearer",),
    # "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    # "USER_ID_FIELD": "id",
    # "USER_ID_CLAIM": "user_id",
    # "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    # "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # "TOKEN_TYPE_CLAIM": "token_type",
    # "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    # "JTI_CLAIM": "jti",

    # "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    # "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    # "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    # #### customize한 serializer로 변경함.
    
    # "TOKEN_OBTAIN_SERIALIZER": "users.serializers.jwt_token.SeasonTokenObtainPairSerializer",
    # #### "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    
    # "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.CustomRefreshToken",
    # "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    # "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    # "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    # "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}

AUTHENTICATION_BACKENDS = [
    'strawberry_django_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 앱이 로컬에서 실행 중일 때
    "https://yourapp.com",    # 실제 배포된 React 앱의 도메인
    "http://192.168.137.1:3000",
    "http://192.168.30.45:3000"
]

CORS_ALLOW_CREDENTIALS = True # 쿠키와 함꼐 요청을 보낼 수있도록

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'django.server': {
            '()': 'django.utils.log.ServerFormatter',
            'format': '[{server_time}] {message}',
            'style': '{',
        },
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'ERROR',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
        },
        'django.server': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'django.server',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'file': {
            'level': 'INFO',
            'filters': ['require_debug_false'],
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs/backend.log',
            'maxBytes': 1024*1024*5,  # 5 MB
            'backupCount': 5,
            'formatter': 'standard',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'mail_admins', 'file'],
            'level': 'INFO',
        },
        'django.server': {
            'handlers': ['django.server'],
            'level': 'INFO',
            'propagate': False,
        },
    }
}