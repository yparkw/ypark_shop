from rest_framework import serializers
from products.models.product import Product
from cart.models.cart import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    productItemId = serializers.IntegerField(write_only=True)
    price = serializers.IntegerField(source='product.price')
    stock = serializers.IntegerField(source='product.stock')
    name = serializers.CharField(source='product.name')
    thumbImages = serializers.ImageField(source='product.thumbImages')

    
    class Meta:
        model = CartItem
        fields = ['productItemId', 'quantity', 'size']

    def create(self, validated_data):
        product_item_id = validated_data.pop('productItemId')
        product = Product.objects.get(id=product_item_id)  # Product 인스턴스 가져오기

        user = self.context['request'].user
        cart, created = Cart.objects.get_or_create(user=user)
        return CartItem.objects.create(cart=cart, productItemId=product, **validated_data)

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']