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

from common.paginations import CustomPagination
# from core.paginations import CustomPaginatorInspectorClass
from products.models.product import Product
from products.serializers.product import ProductListSZ
from products.serializers.product import ProductCreateSZ
from products.serializers.product import ProductUpdateRequestSZ
from products.serializers.product import ProductImageUploadSerializer
from products.serializers.product import ProductResponseSZ
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

import logging
logger = logging.getLogger(__name__)

# @permission_classes([AllowAny, ]) # 디버깅용 AllowAny
# Create your views here.
class ProductListCreateAV(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    queryset = Product.objects.all()
    http_method_names = ['get', 'post']
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_permissions(self):
        """
        'GET' 요청에 대해서는 모든 사용자가 접근할 수 있도록 권한 설정을 변경합니다.
        """
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        
        if category:
            queryset = queryset.filter(category=category)
            logger.debug(queryset)
        return queryset
        
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductListSZ
        elif self.request.method == 'POST':
            return ProductCreateSZ

    def get(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.get_serializer(page, many=True)
        logger.debug(serializer)
        return self.get_paginated_response(data=serializer.data)

    def post(self, request, *args, **kwargs):
        logger.info(f"Received data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        # Product에 이미지가 있따면 post로 받아야하고 내용은 form형식이여야 한다.)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status= status.HTTP_200_OK, headers=headers)
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

class ProductImageUploadAV(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ProductImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()  # 이미지 저장 및 URL 반환
            logger.debug(f"Image Upload Successful: {data}")
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            logger.warning(f"Image Upload Failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @permission_classes([AllowAny, ]) # 디버깅용 AllowAny
class ProductRetrieveUpdateDestroyAV(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductUpdateRequestSZ
    queryset = Product.objects.all()
    http_method_names = ['get', 'patch', 'delete']
    parser_classes = [JSONParser,FormParser, MultiPartParser]

    def get_permissions(self):
        """
        'GET' 요청에 대해서는 모든 사용자가 접근할 수 있도록 권한 설정을 변경합니다.
        """
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductResponseSZ
        elif self.request.method == 'PATCH':
            return ProductUpdateRequestSZ


    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class ProductDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        try:
            item = Product.objects.get(pk=pk)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'error': 'CartItem not found'}, status=status.HTTP_404_NOT_FOUND)