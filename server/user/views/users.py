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
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from user.models import User
from user.serializers.user import UserListSZ, UserUpdateRequestSZ, UserSerializer

from common.paginations import CustomPagination

import logging
logger = logging.getLogger(__name__)

  
class UserRetrieveUpdateDestroyAV(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateRequestSZ
    queryset = User.objects.all()
    http_method_names = ['get', 'patch', 'delete']
    parser_classes = [JSONParser, FormParser, MultiPartParser]


    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return UserUpdateRequestSZ


    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        logger.info(f"Received data for user patch: {request.data}")
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        logger.info(f"Received data for user delete: {request.data}")
        return self.destroy(request, *args, **kwargs)

class UserDetailView(APIView):
    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user)
            logger.debug(serializer.data)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_list(request):
    """
    이 뷰는 사용자 목록을 페이지네이션하여 반환합니다.
    """
    # 페이지네이터 인스턴스 생성
    paginator = CustomPagination()
    
    # 쿼리셋 준비
    queryset = User.objects.all()
    page = paginator.paginate_queryset(queryset, request)
    
    # 페이지네이션된 쿼리셋을 직렬화
    if page is not None:
        serializer = UserListSZ(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    # 페이지네이션이 없는 경우의 처리 (보통은 발생하지 않음)
    serializer = UserListSZ(queryset, many=True)
    return Response(serializer.data)


# class UserListCreateAV(ListCreateAPIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     pagination_class = CustomPagination
#     queryset = User.objects.all()
#     http_method_names = ['get', 'post']
#     parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    
#     def get_serializer_class(self):
#         if self.request.method == 'GET':
#             return UserListSZ

#     def get(self, request, *args, **kwargs):
#         page = self.paginate_queryset(self.get_queryset())
#         serializer = self.get_serializer(page, many=True)
#         return self.get_paginated_response(data=serializer.data)

#     # def post(self, request, *args, **kwargs):
#     #     logger.info(f"Received data: {request.data}")
#     #     serializer = self.get_serializer(data=request.data)
#     #     print(request.data)
#     #     # Product에 이미지가 있따면 post로 받아야하고 내용은 form형식이여야 한다.)
#     #     if serializer.is_valid():
#     #         self.perform_create(serializer)
#     #         headers = self.get_success_headers(serializer.data)
#     #         return Response(serializer.data, status= status.HTTP_200_OK, headers=headers)
#     #     logger.error(f"Serializer errors: {serializer.errors}")    
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  