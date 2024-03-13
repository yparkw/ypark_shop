from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from common.models import TimestampBaseModel
from cart.models.cart import Cart
from django.utils import timezone
from datetime import timedelta
import uuid


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)

        return self.create_user(username, email, password, **extra_fields)


class User(TimestampBaseModel, AbstractBaseUser):
    username = models.CharField(max_length=20, null=True, blank=True, help_text='유저 이름')
    email = models.EmailField(max_length = 50, unique=True, help_text='유저 이메일')
    phone = models.CharField(max_length = 20, help_text = '연락가능한 번호')
    address = models.CharField(max_length = 100, default = "도로명주소")
    detailAddress = models.CharField(max_length = 100, default = "상세주소", help_text='상세주소')
    postCode = models.CharField(max_length = 100, default = "우편번호")
    points = models.IntegerField(default = 0)
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone', 'address', 'detailAddress', 'postCode']

    def __str__(self):
        return self.username

    def has_perm(self, perm=None, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label=None):
        return self.is_admin