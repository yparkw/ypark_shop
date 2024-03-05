from django.http import JsonResponse
from purchase.models.purchase import Purchase

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


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