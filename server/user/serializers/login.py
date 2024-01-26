from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import logging

logger = logging.getLogger(__name__)
class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['id'] = user.id
        token['name'] = user.name
        token['phone'] = user.phone
        token['address'] = user.address
        token['detailAddress'] = user.detailAddress
        token['postcode'] = user.postcode
        token['role'] = user.role
        
        return token