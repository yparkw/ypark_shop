from rest_framework import serializers
from products.models.product import Product, ProductSize
from cart.models.cart import Cart, CartItem


class ProductSizeSerializer(serializers.ModelSerializer):
    size_name = serializers.CharField(source='size.size', read_only=True)
    size_count = serializers.IntegerField(source='count', read_only=True)

    class Meta:
        model = ProductSize
        fields = ['size', 'size_name', 'size_count']
        
class ProductSerializer(serializers.ModelSerializer):
    sizes_with_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image_url', 'sizes_with_count']

    def get_sizes_with_count(self, obj):
        # ProductSize 인스턴스들을 가져오는 쿼리셋
        product_sizes = ProductSize.objects.filter(product=obj)
        # ProductSizeSerializer를 이용해 직렬화
        serializer = ProductSizeSerializer(product_sizes, many=True)
        return serializer.data


class CartItemSerializer(serializers.ModelSerializer):
    productItemId = ProductSerializer(read_only=True)
    
    
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'productItemId', 'quantity', 'size']
        extra_kwargs = {'cart': {'read_only': True}}
        
    def create(self, validated_data):
    # 현재 요청을 보낸 사용자의 장바구니를 가져옵니다.
        user = self.context['request'].user
        cart, _ = Cart.objects.get_or_create(user=user)
        validated_data['cart'] = cart
        
        product_id = self.context['request'].data.get('productItemId')
        if product_id:
            # Product 인스턴스 찾기
            product = Product.objects.get(id=product_id)
            # CartItem에 Product 할당
            validated_data['productItemId'] = product
        return super().create(validated_data)
    
    
    
class CartItemResponseSerializer(serializers.ModelSerializer):
    productItemId = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'productItemId', 'quantity', 'size']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']