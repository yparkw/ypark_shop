from django.db import models
from common.models import TimestampBaseModel
from common.utils import rename_image_file_to_uuid

class Size(models.Model):
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', "X-Large"),
        ('FREE', "Free")
    ]
    size = models.CharField(max_length = 5, choices = SIZE_CHOICES)
    
    def __str__(self):
        return self.size # 이는 choices의 레이블을 반환
    
class Product(TimestampBaseModel):
    CATEGORY_CHOICES = [
        ('아우터', 'outer'),
        ('상의', 'top'),
        ('하의', 'pants'),
        ('신발', 'shoes'),
        ('악세사리', 'accessory'),
    ]

    name = models.CharField(db_index=True, max_length=30, help_text='상품 이름')
    price = models.DecimalField(db_index=True, max_digits=10, decimal_places=2, help_text='상품 가격')
    sizes = models.ManyToManyField(Size, through='ProductSize', related_name='product_sizes')
    category = models.CharField(max_length=50, choices = CATEGORY_CHOICES, default = '상의')
    image_url = models.URLField(null=True, blank=True, help_text='상품 이미지')
    

    class Meta:
        ordering = ['modified_at', ]
        

    
class ProductSize(models.Model):
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)