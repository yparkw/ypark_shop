from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from common.models import TimestampBaseModel
from cart.models.cart import Cart
from django.utils import timezone
from datetime import timedelta
import uuid


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, phone, address, postCode):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            address = address,
            phone = phone,
            postCode = postCode,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password, phone, address, postCode):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            password=password,
            phone = phone,
            address = address,
            postCode = postCode,
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save()
        return user


class User(TimestampBaseModel, AbstractBaseUser):
    username = models.CharField(max_length=20, null=True, blank=True, help_text='유저 이름')
    email = models.EmailField(max_length = 50, unique=True, help_text='유저 이메일')
    phone = models.CharField(max_length = 20, help_text = '연락가능한 번호')
    address = models.CharField(max_length = 100)
    postCode = models.CharField(max_length = 100)
    # cart = models.OneToOneField('Cart', on_delete=models.CASCADE, null=True, blank=True, related_name='owner')
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.username

    def has_perm(self, perm=None, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label=None):
        return self.is_admin