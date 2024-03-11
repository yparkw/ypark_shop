from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
import logging

logger = logging.getLogger(__name__)

# TokenObtain == Access Token 으로 생각하면 됨! 
# 즉, 이곳에서 claim에 어떤 정보를 담고 싶은지에 대한 커스터마이징을 진행하면 됨!
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    username_field = "email"
    
    def validate(self, attrs):
        # email과 password를 사용하여 사용자 인증
        user = authenticate(email=attrs.get("email"),password=attrs.get("password"))
        if user is None:
            raise serializers.ValidationError("Invalid email or password")
        # 유효한 사용자인 경우, 토큰 생성
        data = super().validate(attrs)
        data['user'] = user
        return data
    
    
    @classmethod
    def get_token(cls, user):
        # 사용자 정보를 토큰에 추가
        token = super().get_token(user)
        token['email'] = user.email

        return token
    
class CustomTokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    address = serializers.CharField(read_only=True)
    detailAddress = serializers.CharField(read_only=True)
    postCode = serializers.CharField(read_only=True)
    is_admin = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    
