from django.http import JsonResponse


from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser

from purchase.models.purchase import Purchase
from purchase.serializers.purchase import PurchaseItemSerializer

class PurchaseRetrieveUpdateDestroyAV(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = Purchase
    queryset = Purchase.objects.all()
    http_method_names = ['get', 'patch', 'delete']
    parser_classes = [JSONParser,FormParser, MultiPartParser]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PurchaseItemSerializer
        elif self.request.method == 'PATCH':
            return PurchaseItemSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


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

@api_view(['DELETE'])
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