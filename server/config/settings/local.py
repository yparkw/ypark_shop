from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*']


STATIC_ROOT = '/app/static/'
STATICFILES_DIRS = []


MEDIA_URL = 'http://localhost:8000/media/'
MEDIA_ROOT = "/app/media/"

CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요
CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",  # React 앱이 로컬에서 실행 중일 때
    "https://yourapp.com",    # 실제 배포된 React 앱의 도메인
    "http://192.168.137.1:3000",
    "http://192.168.30.45:3000"
]
CORS_ALLOW_CREDENTIALS = True # 쿠키와 함꼐 요청을 보낼 수있도록

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'iseul',
        'USER': 'admin',
        'PASSWORD': '!l1185216',
        'HOST': 'db',  # 혹은 도커 서비스 이름
        'PORT': 5432,
    }
}



IAMPORT_KEY = '1513772424248766',
IAMPORT_SECRET = 'jCgJnrqDO8WS3XXpIGMB5Gd8KtjdNlx9TRKFw7tGcuuI70QxdaKlpHXu7W8dypdklSQ2mk1vczmxquCe',

AUTH_PASSWORD_VALIDATORS = [
    # 기존의 비밀번호 검증기 설정들...
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 9,  # 원하는 최소 비밀번호 길이 설정
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    # 여기에 커스텀 비밀번호 검증기 추가
    {
        'NAME': 'user.validators.CustomPasswordValidator',  # 'your_app_name'을 앱의 실제 이름으로 변경
    },
]