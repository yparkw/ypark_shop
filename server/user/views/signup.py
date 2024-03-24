from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.contrib.auth import get_user_model
from user.serializers.signup import UserSignupSZ
from django.conf import settings
import requests
from user.iamport import get_token

User = get_user_model()

class VerifyIdentityView(APIView):
    permission_classes = [AllowAny, ]
    
    def post(self, request):
        # Portone 인증 로직을 여기에 구현
        # 예시로, Portone의 API 엔드포인트와 통신하는 코드를 작성합니다.
        # 실제 통신 코드는 Portone의 API 문서를 참조해야 합니다.
        access = get_token()
        # 예시 코드
        url = 'https://api.portone.com/verify'
        data = {
            'merchant_uid': 'your_merchant_uid',
            # 필요한 인증 데이터
        }
        headers = {
            'Authorization': f'Bearer {access}',  # settings.py에 API 키를 저장
        }
        
        response = requests.post(url, json=data, headers=headers)
        
        if response.status_code == 200:
            # 성공적으로 인증됨
            return Response({'success': True, 'data': response.json()})
        else:
            # 인증 실패
            return Response({'success': False, 'error_msg': '인증에 실패하였습니다.'}, status=400)

class UserSignUpCreateAV(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSZ
    permission_classes = [AllowAny, ]

    # @swagger_auto_schema(
    #     responses={
    #         status.HTTP_200_OK: UserSignupSZ
    #     },
    #     operation_description='회원 가입 API'
    # )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(data=serializer.errors, status=400)