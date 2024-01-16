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
        extra_kwargs = {'cart': {'read_only': True}}
        
    def create(self, validated_data):
    # 현재 요청을 보낸 사용자의 장바구니를 가져옵니다.
        user = self.context['request'].user
        cart, _ = Cart.objects.get_or_create(user=user)
        validated_data['cart'] = cart
        return super().create(validated_data)

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']