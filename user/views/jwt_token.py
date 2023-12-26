from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema

from user.serializers.jwt_token import TokenObtainPairResponseSerializer, SeasonTokenObtainPairSerializer
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
        # return super().post(request, *args, **kwargs)
        email = request.data.get("email")
        password = request.data.get("password")
        
        user = authenticate(email = email, password=password)

        if user is not None:
            refresh = self.get_serializer_class()(user)
            return Response(refresh.data, status=status.HTTP_200_OK)
        
        return Response({'detail': 'Invalid credentials'}, status = status.HTTP_401_UNAUTHORIZED)

class CustomTokenRefreshView(TokenRefreshView):
    # @swagger_auto_schema(
    #     responses={
    #         status.HTTP_200_OK: TokenRefreshResponseSerializer},
    #     operation_description='refresh token으로 jwt token 갱신 API',
    # )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)