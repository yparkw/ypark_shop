from django.http import JsonResponse
from purchase.models.purchase import Purchase
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from ..iamport import get_token
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from products.models.product import Product


@api_view(['POST'])  # API 뷰로 지정
@authentication_classes([JWTAuthentication])  # JWT 인증 사용
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def verify_purchase(request):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    imp_uid = request.POST.get('imp_uid')
    merchant_uid = request.POST.get('merchant_uid')
    access = get_token()

    # 아임포트 서버로부터 결제 정보 검증
    url = 'https://api.iamport.kr/payments/' + imp_uid
    headers = {
        'Authorization': 'Bearer ' + access # 여기서 'YOUR_ACCESS_TOKEN'은 아임포트에서 발급받은 액세스 토큰입니다.
    }
    response = requests.get(url, headers=headers)
    result = response.json()
    
    # 결제 검증 로직...
    # 결제 검증 후 구매 정보 저장
    if result['code'] == 0:  # 결제 검증 성공
        purchase = Purchase.objects.create(
            imp_uid=result['response']['imp_uid'],
            merchant_uid=result['response']['merchant_uid'],
            amount=result['response']['amount'],
            status=result['response']['status'],
            buyer_name=request.POST.get('buyer_name'),
            buyer_email=request.POST.get('buyer_email'),
            buyer_tel=request.POST.get('buyer_tel'),
            buyer_address=request.POST.get('buyer_address'),
            buyer_postcode=request.POST.get('buyer_postcode'),
        )
        # 구매한 상품 정보 저장
        for item in request.POST.get('products'):
            Product.objects.create(
                purchase=purchase,
                product_id=item['productId'],
                quantity=item['quantity'],
                size=item['size'],
            )
        return JsonResponse({'status': 'success', 'data': 'Purchase completed successfully.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Payment verification failed.'})