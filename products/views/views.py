from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FormParser, JSONParser
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from common.paginations import CustomPagination
# from core.paginations import CustomPaginatorInspectorClass
from products.models.product import Product
from products.serializers.product import ProductListSZ
from products.serializers.product import ProductCreateSZ
from products.serializers.product import ProductUpdateRequestSZ
from products.serializers.product import ProductResponseSZ
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny, ]) # 디버깅용 AllowAny
# Create your views here.
class ProductListCreateAV(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    queryset = Product.objects.all()
    http_method_names = ['get', 'post']
    parser_classes = (JSONParser,MultiPartParser, FormParser)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductListSZ
        elif self.request.method == 'POST':
            return ProductCreateSZ

    # @swagger_auto_schema(
    #     operation_description='상품 목록 API',
    #     paginator_inspectors=[CustomPaginatorInspectorClass],
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'Authorization',
    #             openapi.IN_HEADER,
    #             description="Bearer {token}",
    #             type=openapi.TYPE_STRING
    #         )
    #     ]
    # )
    def get(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(data=serializer.data)

    # @swagger_auto_schema(
    #     operation_description='상품 등록 API',
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'Authorization',
    #             openapi.IN_HEADER,
    #             description="Bearer {token}",
    #             type=openapi.TYPE_STRING
    #         )
    #     ]
    # )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # Product에 이미지가 있따면 post로 받아야하고 내용은 form형식이여야 한다.)
        if serializer.is_valid():
            # serializer.save(
            #     image=request.data.get('image')
            # )
            serializer.save()
            return Response(serializer.data, status= 201)
        raise Response(serializer.errors, status=400)


class ProductRetrieveUpdateDestroyAV(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductUpdateRequestSZ
    queryset = Product.objects.all()
    http_method_names = ['get', 'patch', 'delete']
    parser_classes = (FormParser, MultiPartParser)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductListSZ
        elif self.request.method == 'PATCH':
            return ProductUpdateRequestSZ
        return self.serializer_class
    #
    # @swagger_auto_schema(
    #     operation_description='상품 detail API',
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'Authorization',
    #             openapi.IN_HEADER,
    #             description="Bearer {token}",
    #             type=openapi.TYPE_STRING
    #         )
    #     ]
    # )

    @extend_schema(
        responses=ProductListSZ,
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    # @swagger_auto_schema(
    #     operation_description='상품 수정 API',
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'Authorization',
    #             openapi.IN_HEADER,
    #             description="Bearer {token}",
    #             type=openapi.TYPE_STRING
    #         )
    #     ],
    #     responses={
    #         '200': ProductResponseSZ
    #     }
    # )
    @extend_schema(
        responses=ProductUpdateRequestSZ,
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    # @swagger_auto_schema(
    #     operation_description='상품 삭제 API',
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'Authorization',
    #             openapi.IN_HEADER,
    #             description="Bearer {token}",
    #             type=openapi.TYPE_STRING
    #         )
    #     ]
    # )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)