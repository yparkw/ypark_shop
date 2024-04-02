from django.test import TestCase
from products.models.product  import Product, Size, ProductSize
from products.serializers.product import ProductUpdateRequestSZ

class ProductUpdateTestCase(TestCase):
    def setUp(self):
        self.size_s = Size.objects.create(size='S')
        self.product = Product.objects.create(name="Test Product", price=100.00, category='상의')
        ProductSize.objects.create(product=self.product, size=self.size_s, count=10)
        
    def test_product_update(self):
        
        update_data = {
            'name': "Updated Product Name",
            'sizes': [
                {'size': 'S', 'count': 5},
            ]
        }
        serializer = ProductUpdateRequestSZ(instance=self.product, data=update_data, partial=True )
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        
        serializer.save()
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, update_data['name'])
        updated_product_size = ProductSize.objects.get(product=self.product, size=self.size_s)
        self.assertEqual(updated_product_size.count, 5)