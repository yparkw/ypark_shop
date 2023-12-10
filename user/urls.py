from django.urls import path

from .views.jwt_token import CustomTokenObtainPairView
from .views.jwt_token import CustomTokenRefreshView
from .views.signup import UserSignUpCreateAV
from .views.profile import UserRetrieveUpdate
from .views.test import celery_test_view

app_name = 'users'

urlpatterns = [
    path('', UserRetrieveUpdate.as_view(), name='profile'),
    path('signup/', UserSignUpCreateAV.as_view(), name='signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', CustomTokenRefreshView.as_view(), name='login_refresh'),
    # path('test/', celery_test_view),
]