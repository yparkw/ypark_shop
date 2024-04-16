from .base import *

Debug = False

ALLOWED_HOSTS = ['api.ipify.org', 'www.shadowserver.org', 'ip-api.com', 'google.com',
                 'http://192.168.30.15/','34.125.116.9', 'yparkw.com', 'www.yparkw.com', 'api64.ipify.org']

STATIC_ROOT = '/app/static/'
STATICFILES_DIRS = []

# MEDIA_URL = 'https://www.yparkw.com/media/'
MEDIA_URL = 'http://192.168.30.15/media/'
MEDIA_ROOT = '/app/media/'


CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요
CORS_ALLOWED_ORIGINS = [
    "http://www.yparkw.com",
    "http://yparkw.com",
    "https://yparkw.com",
    "https://www.yparkw.com",    # 실제 배포된 React 앱의 도메인
    "http://192.168.30.15:3000"
    "https://192.168.30.15:3000"
    "http://34.125.116.9:3000",
    "https://34.125.116.9:3000",
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


IAMPORT_KEY = 'store-451d72a3-954f-477a-90ad-32ca43320cf4',
IAMPORT_SECRET = 'o2HcZRmup46s7kkhnNmYIH8QT3PVUzWMVwLc4Bdq4vYVj20Gr3YLyOoRlP06RrgbAKCwDjnkASJ1mmvi',

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