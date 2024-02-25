import uuid

from django.db import models
from django.conf import settings
from common.models import TimestampBaseModel

from products.models.product import Product

class Purchase(TimestampBaseModel):
    imp_uid = models.CharField(default = 'null', max_length=100) # 아임포트 결제 고유 ID
    merchant_uid = models.CharField(default = 'null', max_length=100) # 가맹점 주문번호
    amount = models.DecimalField(default = 0, max_digits=10, decimal_places=2) # 결제 금액
    status = models.CharField(default = 'anonymous', max_length=20) # 결제 상태
    
    buyer_name = models.CharField(max_length=100, null=True)
    buyer_email = models.CharField(max_length=100, null=True)
    buyer_tel = models.CharField(max_length=100, null=True)
    buyer_address = models.CharField(max_length=255, null=True)
    buyer_detailAddress = models.CharField(default='상세주소', max_length=255, null=True)
    buyer_postcode = models.CharField(max_length=50, null=True)
    
class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    size = models.CharField(max_length=10)