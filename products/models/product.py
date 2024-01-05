from django.db import models

from common.models import TimestampBaseModel
from common.utils import rename_image_file_to_uuid


class Product(TimestampBaseModel):
    CATEGORY_CHOICES = [
        ('아우터', 'outer'),
        ('상의', 'top'),
        ('하의', 'pants'),
        ('신발', 'shoes'),
        ('악세사리', 'accessory'),
        
    ]
    
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('FREE', 'Free')
    ]

    name = models.CharField(db_index=True, max_length=30, help_text='상품 이름')
    price = models.DecimalField(db_index=True, max_digits=10, decimal_places=2, help_text='상품 가격')
    size = models.CharField(max_length=4, choices=SIZE_CHOICES, default='M', help_text='상품 사이즈')
    stock = models.IntegerField(help_text='재고', default=0)
    category = models.CharField(max_length=50, choices = CATEGORY_CHOICES, default = '상의')
    image_url = models.URLField(null=True, blank=True, help_text='상품 이미지')
    

    class Meta:
        ordering = ['modified_at', ]