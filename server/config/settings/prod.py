from .base import *

Debug = False

ALLOWED_HOSTS = ['211.45.167.63']

STATIC_ROOT = '/app/static/'
STATICFILES_DIRS = []

MEDIA_ROOT = '/app/media/'

CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요
CORS_ALLOWED_ORIGINS = [
    "http://www.yparkw.com",
    "https://www.yparkw.com",    # 실제 배포된 React 앱의 도메인
    "https://211.45.167.63:3000",
]
CORS_ALLOW_CREDENTIALS = True # 쿠키와 함꼐 요청을 보낼 수있도록

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'yparkw',
        'USER': 'admin',
        'PASSWORD': 'qkr102998!!',
        'HOST': 'db',  # 혹은 도커 서비스 이름
        'PORT': 5432,
    }
}
