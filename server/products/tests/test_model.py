from django.test import TestCase
from django.core.exceptions import ValidationError
from products.models.product import Product, Size, ProductSize
# Create your tests here.

class ProductModelTestCase(TestCase):
    def setUp(self):
        self.size_s = Size.objects.create(size='S')
        self.size_m = Size.objects.create(size='M')
        self.product = Product.objects.create(
            name="테스트 상품",
            price=10000,
            category='상의',
            image_url="https://www.iseul.com/media/test_1"
        )
        ProductSize.objects.create(product=self.product, size=self.size_s, count=5)
        ProductSize.objects.create(product=self.product, size=self.size_m, count=10)

    def test_product_creation(self):
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(self.product.sizes.count(), 2)
        self.assertEqual(ProductSize.objects.count(), 2)
        
    def test_field_values(self):
        product = Product.objects.get(name="테스트 상품")
        self.assertEqual(product.price, 10000)
        self.assertEqual(product.category, '상의')
        self.assertEqual(product.image_url, 'https://www.iseul.com/media/test_1')
        
    def test_str_methods(self):
        self.assertEqual(str(self.size_s), 'S')
        self.assertEqual(str(self.product.name), '테스트 상품')
        
    def test_invalid_data(self):
        with self.assertRaises(ValidationError):
            Product.objects.create(name="잘못된 상품", price="오류", category='상의')
            