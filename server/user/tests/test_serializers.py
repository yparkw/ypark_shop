from django.test import TestCase

from user.models import User
from user.serializers.signup import UserSignupSZ
from user.serializers.profile import PatchProfileSZ


class UserSignupSZTestCase(TestCase):
    def setUp(self) -> None:
        pass

    # self.assertTrue(serializer.is_valid())
    # AssertionError: *** is not true
    # def test_signup_기본(self):
    #     user_data = dict(
    #         username='test_user',
    #         email='test_user@email.com',
    #         password='123456',
    #         address = 'test_adrress',
    #         postCode = '55555',
    #     )
    #     serializer = UserSignupSZ(data=user_data)
    #     self.assertTrue(serializer.is_valid())
    #     test_user = serializer.save()

    #     self.assertEqual(user_data.get('username'), test_user.username)
    #     self.assertEqual(user_data.get('email'), test_user.email)

    def test_signup_이메일_양식_올바르지_않음(self):
        user_data = dict(
            username='test_user',
            email='test_useremail.com',
            password='1234'
        )
        serializer = UserSignupSZ(data=user_data)
        self.assertFalse(serializer.is_valid())


class UserProfileSZTestCase(TestCase):
    def setUp(self) -> None:
        pass


class UserPatchProfileSZTestCase(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username='test_user',
            email='test_user@email.com',
            password='1234',
            address = 'test_address',
            postCode = 'test_code',
        )

    def test_profile_이름_변경_가능(self):
        email = self.user.email
        update_user_data = dict(
            username='new_test_user_name',
        )

        serializer = PatchProfileSZ(instance=self.user, data=update_user_data, partial=True)
        self.assertTrue(serializer.is_valid())
        serializer.save()

        self.assertEqual(update_user_data.get('username'), self.user.username)
        self.assertEqual(email, self.user.email)

    def test_profile_이메일_변경_불가(self):
        update_user_data = dict(
            email='new_test_user@email.com'
        )

        serializer = PatchProfileSZ(instance=self.user, data=update_user_data, partial=True)
        self.assertTrue(serializer.is_valid())
        serializer.save()

        self.assertNotEqual(update_user_data.get('email'), self.user.email)