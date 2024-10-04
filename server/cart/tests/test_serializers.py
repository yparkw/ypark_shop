from django.test import TestCase
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate
from rest_framework.request import Request
from django.contrib.auth import get_user_model
from products.models.product import Product, ProductSize, Size
from cart.models.cart import Cart, CartItem
from cart.serializers.cart import CartSerializer, CartItemSerializer, ProductSerializer, ProductSizeSerializer

User = get_user_model()

class SerailizerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test@test.com", username="testuser", password="12345")
        self.factory = APIRequestFactory()
        self.request = self.factory.get('/')
        force_authenticate(self.request, self.user)
        self.drf_request = Request(self.request)
        
        
        self.product = Product.objects.create(name='Test Product', price=100.00, category='Outer')
        self.size = Size.objects.create(size='L')
        self.product_size = ProductSize.objects.create(product=self.product, size=self.size, count=10)
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, productItemId=self.product, quantity=2, size = 'L')
        
    def test_product_size_serializer(self):
        serializer = ProductSizeSerializer(instance=self.product_size)
        data = serializer.data
        self.assertEqual(data['size_name'], 'L')
        self.assertEqual(data['size_count'], 10)
        
    def test_product_serializer(self):
        serializer = ProductSerializer(instance=self.product)
        data=serializer.data
        self.assertIn('sizes_with_count', data)
        self.assertIsInstance(data['sizes_with_count'], list)
        
        if data['sizes_with_count']:
            expected_size_data = {'size': self.size.id, 'size_name': 'L', 'size_count': 10}
            self.assertIn(expected_size_data, [dict(s) for s in data['sizes_with_count']])
        
    def test_cart_item_serializer_create(self):
        data = {
            'productItemId': self.product.id,
            'quantity': 1,
            'size': 'L'
        }
        context = {'request': self.drf_request}
        
        serializer = CartItemSerializer(data=data, context=context)
        
        self.assertTrue(serializer.is_valid(), serializer.errors)
        # cart_item = serializer.save()
        serializer.save()

        expected_product_data = {
            'name': self.product.name,
            'price': 100.00,
            'category': self.product.category,
            'sizes_with_count': [
                {
                    'size': self.size.id,
                    'size_name': self.size.size,
                    'size_count': self.product_size.count
                }
            ]
        }

        self.assertEqual(serializer.data['productItemId'], expected_product_data)

        # self.assertIsNotNone(cart_item)
        # self.assertEqual(cart_item.cart, self.cart)
        # self.assertEqual(cart_item.productItemId, self.product)
        # self.assertEqual(cart_item.quantity, 1)
        # self.assertEqual(cart_item.size, 'L')

        # self.assertTrue(CartItem.objects.filter(cart=self.cart, productItemId=self.product).exists())
        # self.assertEqual(cart_item.quantity, 1)
        # self.assertEqual(cart_item.size, 'M')
        
    def test_cart_serializer(self):
        serializer = CartSerializer(instance=self.cart)
        data = serializer.data
        self.assertEqual(len(data['items']), 1)