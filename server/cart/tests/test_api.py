from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework.request import Request
from django.contrib.auth import get_user_model
from products.models.product import Product, Size, ProductSize
from cart.models.cart import Cart, CartItem

User = get_user_model()

class CartAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@test.com', username="testuser", password="12345")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        
        self.product = Product.objects.create(name='Test Product', price=100.00, category='outer', image_url='www.test-server.com/image-url')
        self.size = Size.objects.create(size='L')
        self.product_size = ProductSize.objects.create(product=self.product, size=self.size, count=10)
        
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, productItemId=self.product, quantity=2, size='L')
        
    def test_get_cart(self):
        url = reverse('api:cart:cart')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('items', response.data)
        self.assertEqual(len(response.data['items']), 1)
        
    def test_add_item_to_cart(self):
        url = reverse('api:cart:cart')
        data = {
            'productItemId': self.product.id,
            'quantity': 1,
            'size': 'L'
        }
        
        response = self.client.post(url, data, format='json')
        
        print(response)  # 응답 데이터를 확인하기 위한 출력
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['quantity'], 1)
        self.assertEqual(response.data['size'], 'L')
        
    def test_delete_item_from_cart(self):
        url = reverse('api:cart:cart-item-delete', args=[self.cart_item.pk])
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CartItem.objects.filter(pk=self.cart_item.pk).exists())