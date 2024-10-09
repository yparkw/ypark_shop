from django.test import TestCase
from products.models.product  import Product, Size, ProductSize
from products.serializers.product import ProductUpdateRequestSZ

class ProductUpdateTestCase(TestCase):
    def setUp(self):
        self.size_s = Size.objects.create(size='S')
        self.size_m = Size.objects.create(size='M')
        self.product = Product.objects.create(name="Test Product", price=100.00, category='상의')
        ProductSize.objects.create(product=self.product, size=self.size_s, count=10)
        
    def test_product_update(self):
        update_data = {
            'name': "Updated Product Name",
            'sizes': [
                {'size': 'S', 'count': 5},
                {'size': 'M', 'count': 25}
            ]
        }
        serializer = ProductUpdateRequestSZ(instance=self.product, data=update_data, partial=True )
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        
        serializer.save()
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, update_data['name'])
        updated_product_size_s = ProductSize.objects.get(product=self.product, size=self.size_s)
        updated_product_size_m = ProductSize.objects.get(product=self.product, size=self.size_m)
        self.assertEqual(updated_product_size_s.count, 5)
        self.assertEqual(updated_product_size_m.count, 25)
        
    def test_add_new_size(self):
        self.size_l = Size.objects.create(size='L')
        updated_data = {
            'sizes': [
                {'size': 'L', 'count' : 15}
            ]
        }
        
        serializer = ProductUpdateRequestSZ(instance=self.product, data=updated_data, partial=True)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        
        serializer.save()
        new_size = ProductSize.objects.get(product=self.product, size=self.size_l)
        self.assertEqual(new_size.count,15)
        
    def test_remove_size(self):
        updated_data = {
            'sizes': [
                {'size': 'S', 'count': 10}
            ]
        }
        serializer = ProductUpdateRequestSZ(instance=self.product, data=updated_data, partial=True)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        
        serializer.save()
        with self.assertRaises(ProductSize.DoesNotExist):
            ProductSize.objects.get(product=self.product, size=self.size_m)
        
        remaining_size = ProductSize.objects.get(product=self.product, size=self.size_s)
        self.assertEqual(remaining_size.count, 10)