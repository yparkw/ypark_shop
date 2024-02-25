from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from drf_spectacular.utils import extend_schema

from user.models import User
from user.serializers.user import UserListSZ

from common.paginations import CustomPagination

class UserListCreateAV(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    queryset = User.objects.all()
    http_method_names = ['get', 'post']
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserListSZ

    def get(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(data=serializer.data)

    # def post(self, request, *args, **kwargs):
    #     logger.info(f"Received data: {request.data}")
    #     serializer = self.get_serializer(data=request.data)
    #     print(request.data)
    #     # Product에 이미지가 있따면 post로 받아야하고 내용은 form형식이여야 한다.)
    #     if serializer.is_valid():
    #         self.perform_create(serializer)
    #         headers = self.get_success_headers(serializer.data)
    #         return Response(serializer.data, status= status.HTTP_200_OK, headers=headers)
    #     logger.error(f"Serializer errors: {serializer.errors}")    
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)