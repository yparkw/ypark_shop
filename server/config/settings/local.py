from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = 'http://localhost:8000/media/'


CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 앱이 로컬에서 실행 중일 때
    "https://yourapp.com",    # 실제 배포된 React 앱의 도메인
    "http://192.168.137.1:3000",
    "http://192.168.30.45:3000"
]

CORS_ALLOW_CREDENTIALS = True # 쿠키와 함꼐 요청을 보낼 수있도록



IAMPORT_KEY = '1513772424248766',
IAMPORT_SECRET = 'jCgJnrqDO8WS3XXpIGMB5Gd8KtjdNlx9TRKFw7tGcuuI70QxdaKlpHXu7W8dypdklSQ2mk1vczmxquCe',
