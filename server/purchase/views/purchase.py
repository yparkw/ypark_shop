import requests
from django.http import JsonResponse
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from common.paginations import CustomPagination

from purchase.iamport import get_token
from purchase.models.purchase import Purchase
from purchase.serializers.purchase import PurchaseSerializer, PurchaseListSZ

import logging
logger = logging.getLogger(__name__)

class purchaseListCreateAV(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    queryset = Purchase.objects.all()
    http_method_names = ['get', 'post']
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    logger.debug(queryset)
    
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PurchaseListSZ
        elif self.request.method == 'POST':
            return PurchaseSerializer

    def get(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.get_serializer(page, many=True)
        logger.debug(serializer)
        return self.get_paginated_response(data=serializer.data)

    def post(self, request, *args, **kwargs):
        logger.info(f"Received data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        # Product에 이미지가 있따면 post로 받아야하고 내용은 form형식이여야 한다.)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status= status.HTTP_200_OK, headers=headers)
        logger.error(f"Serializer errors: {serializer.errors}")    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()
        return super().perform_create(serializer)
    
@api_view(['POST'])  # API 뷰로 지정
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def verify_purchase(request):
    imp_uid = request.data.get('imp_uid')
    merchant_uid = request.data.get('merchant_uid')
    access = get_token()
    
    
    # 아임포트 서버로부터 결제 정보 검증
    url = 'https://api.iamport.kr/payments/' + imp_uid
    headers = {'Authorization': 'Bearer ' + access} # 여기서 'YOUR_ACCESS_TOKEN'은 아임포트에서 발급받은 액세스 토큰입니다.
    response = requests.get(url, headers=headers)
    result = response.json()
    
    # 결제 검증 로직...
    # 결제 검증 후 구매 정보 저장
    if result['code'] == 0:  # 결제 검증 성공
        serializer = PurchaseSerializer(data= request.data)
        logger.debug(serializer)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'status': 'success', 'data': 'Purchase completed successfully.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Payment verification failed.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Payment failed'})

