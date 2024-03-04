from django.http import JsonResponse
from purchase.models.purchase import Purchase
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from ..iamport import get_token
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from purchase.serializers.purchase import PurchaseItemSerializer, PurchaseSerializer
from products.models.product import Product

import logging
logger = logging.getLogger(__name__)


@api_view(['POST'])  # API 뷰로 지정
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def verify_purchase(request):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    imp_uid = request.data.get('imp_uid')
    merchant_uid = request.data.get('merchant_uid')
    access = get_token()
    
    logger.debug(request.data)
    
    # 아임포트 서버로부터 결제 정보 검증
    url = 'https://api.iamport.kr/payments/' + imp_uid
    headers = {'Authorization': 'Bearer ' + access} # 여기서 'YOUR_ACCESS_TOKEN'은 아임포트에서 발급받은 액세스 토큰입니다.

    response = requests.get(url, headers=headers)
    result = response.json()
    
    # 결제 검증 로직...
    # 결제 검증 후 구매 정보 저장
    if result['code'] == 0:  # 결제 검증 성공
        serializer = PurchaseSerializer(data= request.data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'status': 'success', 'data': 'Purchase completed successfully.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Payment verification failed.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Payment failed'})
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_to_shipping(request, purchase_id):
    try:
        purchase = Purchase.objects.get(id=purchase_id)
        purchase.status = 'shipping'  # '배송중' 상태로 업데이트
        purchase.save()
        return JsonResponse({'status': 'success', 'message': 'Order status updated to shipping.'})
    except Purchase.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Purchase not found.'})   

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def reject_order(request, purchase_id):
    try:
        purchase = Purchase.objects.get(id=purchase_id)
        purchase.status = 'rejected'  # '거절됨' 상태로 업데이트, `rejected` 상태가 모델에 정의되어 있어야 합니다.
        purchase.save()
        return JsonResponse({'status': 'success', 'message': 'Order has been rejected.'})
    except Purchase.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Purchase not found.'})