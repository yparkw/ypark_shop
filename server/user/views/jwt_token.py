from django.db import transaction
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
import logging

logger = logging.getLogger(__name__)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            # 유효성 검사를 진행합니다.
            if serializer.is_valid(raise_exception=True):
                user = serializer.validated_data['user']
                
                # User 객체가 존재하는지 확인합니다.
                if not user or not user.is_active:
                    return Response({'detail': 'User not found or inactive'}, status=status.HTTP_404_NOT_FOUND)
                
                with transaction.atomic():
                    # 토큰을 생성합니다.
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    
                    # 응답 데이터를 생성합니다.
                    response_data = CustomTokenObtainPairResponseSerializer({
                        'refresh': str(refresh),
                        'access': access_token,
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'phone': user.phone,
                        'address': user.address,
                        'detailAddress': user.detailAddress,
                        'postCode': user.postCode,
                        'points' : user.points,
                        'is_admin': user.is_admin,
                        'is_active': user.is_active,
                        'is_staff': user.is_staff
                    }).data
                    
                    return Response(response_data, status=status.HTTP_200_OK)
                
        except Exception as e:
            # 예외가 발생했을 때 로그에 기록합니다.
            logger.error(f"Error during user login: {str(e)}")
            # 클라이언트에게는 일반적인 오류 메시지를 보냅니다.
            return Response({'detail': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CustomTokenRefreshView(TokenRefreshView): 
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)