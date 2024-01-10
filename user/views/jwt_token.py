from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema

from user.serializers.jwt_token import CustomTokenObtainPairResponseSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # 사용자 정보 및 토큰을 포함한 응답 생성
            response_data = CustomTokenObtainPairResponseSerializer({
                'refresh': str(refresh),
                'access': access_token,
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'phone': user.phone,
                'address': user.address,
                'postCode': user.postcode,
                'is_admin': user.is_admin,
                'is_active': user.is_active,
                'is_staff': user.is_staff
            })
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status = status.HTTP_401_UNAUTHORIZED)

class CustomTokenRefreshView(TokenRefreshView):
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)