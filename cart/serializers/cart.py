from rest_framework import serializers
from products.models.product import Product, ProductSize
from cart.models.cart import Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image_url']



class CartItemSerializer(serializers.ModelSerializer):
    productItemId = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['cart', 'productItemId', 'quantity', 'size']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']