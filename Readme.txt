prodcuts prototype 생성하며 사용된 라이브러리 정리하여 블로그 올리기
django-seed
django-strawberry
drf
'drf_spectacular',

@admin.register(Product)
from django.core.management.base import BaseCommand
from django_seed import Seed


@strawberry.django.type(models.Product)
@strawberry.type

from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from collections import OrderedDict
# django import
from django.core.paginator import InvalidPage
# third party import
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from uuid import uuid4