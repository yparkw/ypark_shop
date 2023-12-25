from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from user.serializers.jwt_token import TokenObtainPairResponseSerializer
from user.serializers.jwt_token import TokenRefreshResponseSerializer

from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

    # @swagger_auto_schema(
    #     responses={
    #         status.HTTP_200_OK: TokenObtainPairResponseSerializer},
    #     operation_description='email, password로 jwt token 발급 API',
    # )
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        
        user = authenticate(username = email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user) # JWT 토큰 생성

            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'id': user.id,
                'name': user.username,
                'email': user.email,
                # 다음 필드는 user 모델에 정의된 것으로 가정합니다.
                'phone': getattr(user, 'phone', None),  # user 모델에 phone 필드가 있다고 가정
                'address': getattr(user, 'address', None),  # user 모델에 address 필드가 있다고 가정
                'postcode': getattr(user, 'postCode', None), 
            }
            
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshView(TokenRefreshView):
    # @swagger_auto_schema(
    #     responses={
    #         status.HTTP_200_OK: TokenRefreshResponseSerializer},
    #     operation_description='refresh token으로 jwt token 갱신 API',
    # )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)