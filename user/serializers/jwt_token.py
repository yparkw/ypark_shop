from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# TokenObtain == Access Token 으로 생각하면 됨! 
# 즉, 이곳에서 claim에 어떤 정보를 담고 싶은지에 대한 커스터마이징을 진행하면 됨!
class SeasonTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['email'] = user.email
        
        return token

class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField(help_text='access token 만료시간 999day')
    refresh = serializers.CharField(help_text='refresh token 만료시간 999day')

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
    



class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField(help_text='access token 만료시간 999day')

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()