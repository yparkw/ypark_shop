from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

MEDIA_URL = 'http://localhost:8000/'

CORS_ALLOW_ALL_ORIGINS = False # 개발용, 실제 배포시 보안을 위해 수정 필요


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 앱이 로컬에서 실행 중일 때
    "https://yourapp.com",    # 실제 배포된 React 앱의 도메인
    "http://192.168.137.1:3000",
    "http://192.168.30.45:3000"
]

CORS_ALLOW_CREDENTIALS = True # 쿠키와 함꼐 요청을 보낼 수있도록



IAMPORT_KEY = 'store-451d72a3-954f-477a-90ad-32ca43320cf4',
IAMPORT_SECRET = 'o2HcZRmup46s7kkhnNmYIH8QT3PVUzWMVwLc4Bdq4vYVj20Gr3YLyOoRlP06RrgbAKCwDjnkASJ1mmvi',
