from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
# TokenObtain == Access Token 으로 생각하면 됨! 
# 즉, 이곳에서 claim에 어떤 정보를 담고 싶은지에 대한 커스터마이징을 진행하면 됨!

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if not user:
            raise serializers.ValidationError("User not found")
        
        token = super().get_token(user)

        # 사용자 정보를 토큰에 추가
        token['email'] = user.email

        return token
    
class CustomTokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    username = serializers.CharField(read_only=True)
    email = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    address = serializers.CharField(read_only=True)
    postCode = serializers.CharField(read_only=True)
    is_admin = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    
