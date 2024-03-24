from django.urls import path


from .views.jwt_token import CustomTokenObtainPairView, TokenObtainPairView
from .views.jwt_token import CustomTokenRefreshView, TokenRefreshView
from .views.login import LoginView
from .views.signup import UserSignUpCreateAV, VerifyIdentityView
from .views.profile import UserRetrieveUpdate
from .views.test import celery_test_view
from .views.users import UserListCreateAV, UserRetrieveUpdateDestroyAV, UserDetailView

app_name = 'user'

urlpatterns = [
    path('', UserRetrieveUpdate.as_view(), name='profile'),
    path('verify-identity/', VerifyIdentityView.as_view(), name='verify-identity'),
    path('signup/', UserSignUpCreateAV.as_view(), name='signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', CustomTokenRefreshView.as_view(), name='login_refresh'),
    path('detail/<int:pk>/', UserDetailView.as_view(), name = 'user_datail'),
    path('list/', UserListCreateAV.as_view(), name = 'user_create_list'),
    path('update/<int:pk>/', UserRetrieveUpdateDestroyAV.as_view(), name = 'user_update_destroy'),
    
    # path('test/', celery_test_view),
]