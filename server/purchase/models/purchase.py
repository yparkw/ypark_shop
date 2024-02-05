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