from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        # token['username'] = user.username
        # token['profile_img'] = user.profile_img.url

        return token