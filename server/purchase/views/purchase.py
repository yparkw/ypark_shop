from django.http import JsonResponse
from purchase.models.purchase import Purchase
from ..iamport import get_token
import requests

def verify_purchase(request):
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
    
    return JsonResponse({'status': 'success', 'data': result})