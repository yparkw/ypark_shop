from django.test import TestCase
from products.models.product import Product, Size, ProductSize
# Create your tests here.

class ProductModelTestCase(TestCase):

    def setUp(self):
        # 사이즈 인스턴스 생성
        self.size_s = Size.objects.create(size='S')
        self.size_m = Size.objects.create(size='M')

        # 상품 인스턴스 생성
        self.product = Product.objects.create(
            name="테스트 상품",
            price=10000,
            category='상의',
        )

        # 상품 사이즈 인스턴스 생성
        ProductSize.objects.create(product=self.product, size=self.size_s, count=5)
        ProductSize.objects.create(product=self.product, size=self.size_m, count=10)

    def test_product_creation(self):
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(self.product.sizes.count(), 2)
        self.assertEqual(ProductSize.objects.count(), 2)