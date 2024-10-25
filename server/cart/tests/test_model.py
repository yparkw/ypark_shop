from django.test import TestCase
from django.contrib.auth import get_user_model
from products.models.product import Product
from cart.models.cart import Cart, CartItem

User = get_user_model()

class CartAndItemTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@test.com', username='testuser', password='12345')
        self.product = Product.objects.create(name="Sample product", price=100.00)
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, productItemId=self.product, quantity=2, size='M')
        
    def test_cart_creation(self):
        self.assertEqual(self.cart.user, self.user)
        
    # def test_cart_str(self):
    #     self.assertEqual(str(self.cart))
        
    def test_update_cart_item(self):
        self.cart_item.quantity = 3
        self.cart_item.save()
        self.assertEqual(CartItem.objects.get(id=self.cart_item.id).quantity, 3)
        
    def test_delete_cart_item(self):
        cart_item_id = self.cart_item.id
        self.cart_item.delete()
        with self.assertRaises(CartItem.DoesNotExist):
            CartItem.objects.get(id=cart_item_id)