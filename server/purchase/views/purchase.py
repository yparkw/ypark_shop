import requests
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from common.paginations import CustomPagination

from purchase.iamport import get_token, verify_iamport_payment
from purchase.models.purchase import Purchase, PurchaseItem
from purchase.serializers.purchase import PurchaseSerializer, PurchaseStatusUpdateSerializer, PurchaseListSZ, PurchaseItemSerializer

import logging
logger = logging.getLogger(__name__)

class purchaseListCreateAV(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    queryset = Purchase.objects.all()
    http_method_names = ['get', 'post']
    parser_classes = [JSONParser, MultiPartParser, FormParser]    
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PurchaseListSZ
        elif self.request.method == 'POST':
            return PurchaseSerializer
        
    def get_queryset(self):
        """
        이 메서드는 요청된 status 값에 따라 Purchase 객체의 쿼리셋을 필터링합니다.
        """
        queryset = super().get_queryset()  # 원래 쿼리셋을 가져옵니다.
        status = self.request.query_params.get('status')  # 쿼리 파라미터에서 status 값을 가져옵니다.
        if status is not None:
            queryset = queryset.filter(status=status)  # status 값으로 필터링합니다.
        return queryset

    def get(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.get_serializer(page, many=True)
        logger.debug(serializer.data)
        return self.get_paginated_response(data=serializer.data)

    def post(self, request, *args, **kwargs):
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
            serializer = PurchaseSerializer(data= request.data, context={'request':request})
            
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'success', 'data': 'Purchase completed successfully.'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Payment verification failed.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Payment failed'})
    
    def perform_create(self, serializer):
        serializer.save()
        return super().perform_create(serializer)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])
def purchase_my_list(request, pk):
    status = request.query_params.get('status', None)
    email = request.query_params.get('email', None)
    
    # 사용자 ID와 선택적 상태를 기반으로 구매 목록 필터링
    if status=="ordered":
        purchases = Purchase.objects.filter(
            Q(buyer_email=email) &
            (Q(status=status) | Q(status="shipping")))
    else:
        purchases = Purchase.objects.filter(buyer_email=email, status="cofirmd")
    
    
    serializer = PurchaseListSZ(purchases, many=True)
    logger.debug(f'orderedItem, {serializer.data}')
    return Response(serializer.data)
   
# @api_view(['POST'])  # API 뷰로 지정
# @authentication_classes([JWTAuthentication])  # JWT 인증 사용
# @permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
# def verify_purchase(request):
#     imp_uid = request.data.get('imp_uid')
#     merchant_uid = request.data.get('merchant_uid')
#     access = get_token()
    
    
#     # 아임포트 서버로부터 결제 정보 검증
#     url = 'https://api.iamport.kr/payments/' + imp_uid
#     headers = {'Authorization': 'Bearer ' + access} # 여기서 'YOUR_ACCESS_TOKEN'은 아임포트에서 발급받은 액세스 토큰입니다.
#     response = requests.get(url, headers=headers)
#     result = response.json()
    
#     # 결제 검증 로직...
#     # 결제 검증 후 구매 정보 저장
#     if result['code'] == 0:  # 결제 검증 성공
#         serializer = PurchaseSerializer(data= request.data, context={'request':request})
        
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse({'status': 'success', 'data': 'Purchase completed successfully.'})
#         else:
#             return JsonResponse({'status': 'error', 'message': 'Payment verification failed.'})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Payment failed'})

@api_view(['PATCH'])  # API 뷰로 지정
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def update_purchase_status(request, pk):
    try:
        purchase = Purchase.objects.get(pk=pk)
    except Purchase.DoesNotExist:
        return Response({'error': 'Purchase not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PurchaseStatusUpdateSerializer(purchase, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def purchase_detail(request, pk):
    try:
        purchase = Purchase.objects.get(pk=pk)
        purchase_items = PurchaseItem.objects.filter(purchase=purchase)
        serializer = PurchaseItemSerializer(purchase_items, many=True)
        
        return Response(serializer.data)
    except Purchase.DoesNotExist:
        return Response({'error': 'Purchase not found'}, status=404)

