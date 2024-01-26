# cart/models.py
from django.db import models
from django.conf import settings
from products.models.product import Product

class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    productItemId = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length = 5, default = "S")
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.title}"