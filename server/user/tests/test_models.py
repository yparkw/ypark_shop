from django.test import TestCase
from django.urls import reverse
from user.models import User
from rest_framework import status

class UserModelTestCase(TestCase):
    def setUp(self) -> None:
        pass

    def test_user_model_기본_유저_생성_성공테스트(self):
        user_data = dict(
            username='test_basic_user',
            email='test_basic@email.com',
            password='1234',
            phone='01012341234',
            address = "test_address",
            detailAddress = "test_address",
            postCode = "test_code",
        )

        url = reverse('api:user:signup')

        response = self.client.post(url, user_data, format='json', content_type='application/json')

        # 응답 데이터 검증
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(user_data.get('username'), response.data["username"])
        self.assertEqual(user_data.get('email'), response.data["email"])
        self.assertEqual(user_data.get('phone'), response.data["phone"])
        self.assertEqual(user_data.get('address'), response.data["address"])
        self.assertEqual(user_data.get('detailAddress'), response.data["detailAddress"])
        self.assertEqual(user_data.get('postCode'), response.data["postCode"])


        # 유저가 생성되었는지 확인
        saved_user = User.objects.get(username=user_data['username'])

        self.assertIsNotNone(saved_user)

        self.assertEqual(user_data.get('username'), saved_user.username)
        self.assertEqual(user_data.get('email'), saved_user.email)
        self.assertEqual(user_data.get('phone'), saved_user.phone)
        self.assertEqual(user_data.get('address'), saved_user.address)
        self.assertEqual(user_data.get('detailAddress'), saved_user.detailAddress)
        self.assertEqual(user_data.get('postCode'), saved_user.postCode)
        self.assertEqual(True, saved_user.is_active)
        self.assertEqual(False, saved_user.is_admin)
        self.assertEqual(False, saved_user.is_staff)

    def test_user_model_기본_유저_생성_실패테스트_이메일미유효(self):
        user_data = dict(
            username='test_basic_user',
            email='nodots@nodots',
            password='1234',
            address = "test_address",
            postCode = "test_code",
        )
        basic_user = User.objects.create_user(**user_data)

        self.assertEqual(user_data.get('username'), basic_user.username)
        self.assertEqual(user_data.get('email'), basic_user.email)
        self.assertEqual(True, basic_user.is_active)
        self.assertEqual(False, basic_user.is_staff)

        # TODO is_superuser가 필요한가?
        self.assertEqual(False, basic_user.is_admin)

        self.assertEqual(user_data.get('username'), basic_user.__str__())
        self.assertEqual(basic_user.has_perm(), basic_user.is_admin)
        self.assertEqual(basic_user.has_module_perms(), basic_user.is_admin)


    def test_user_model_어드민_유저_생성(self):
        user_data = dict(
            username='test_super_user',
            email='test_super@email.com',
            password='1234',
            address = 'test_address',
            postCode = 'test_code',
        )
        super_user = User.objects.create_superuser(**user_data)

        self.assertEqual(user_data.get('username'), super_user.username)
        self.assertEqual(user_data.get('email'), super_user.email)
        self.assertTrue(super_user.is_active)
        self.assertTrue(super_user.is_staff)

        # TODO is_superuser가 필요한가?
        self.assertTrue(super_user.is_admin)
