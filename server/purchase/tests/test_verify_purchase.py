from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# setup에서 오류 남 AttributeError: Manager isn't available; 'auth.User' has been swapped for 'user.User'
# class PurchaseTests(TestCase):
#     def setUp(self):
#         # 테스트 사용자 생성
#         self.user = User.objects.create_user(username='testuser', password='password')
#         self.client = APIClient()

#         # JWT 토큰 생성
#         refresh = RefreshToken.for_user(self.user)
#         self.token = str(refresh.access_token)

#         # 사용자 인증
#         self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

#         # 테스트 데이터 준비
#         self.purchase_data = {
#             'imp_uid': '임의의 imp_uid',
#             'merchant_uid': '임의의 merchant_uid',
#             'buyer_name': '구매자 이름',
#             'buyer_email': '구매자 이메일',
#             'buyer_tel': '구매자 전화번호',
#             'buyer_address': '구매자 주소',
#             'buyer_postcode': '구매자 우편번호',
#             'products': [
#                 {
#                     'productId': '상품ID',
#                     'quantity': 1,
#                     'size': 'M'
#                 }
#             ]
#         }

    # 
    # def test_verify_purchase(self):
    #     url = reverse('verify_purchase')  # 'verify_purchase'는 URLconf에서 해당 뷰에 지정한 name입니다.
    #     response = self.client.post(url, self.purchase_data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['status'], 'success')