from rest_framework import serializers

from ..models.product import Product


class ProductListSZ(serializers.ModelSerializer):
    id = serializers.CharField(required=True, help_text='상품 id')

    class Meta:
        model = Product
        # fields = ('title', 'price', 'stock',)
        fields = ('id', 'title', 'price', 'size', 'stock', 'category', 'image')
        read_only_fields = ('id',)


class ProductCreateSZ(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('id',)
        # fields = ('id', 'title', 'price', 'stock',) 디버깅으로 인해 주석처리
        # read_only_fields = ('id',)

    def create(self, validated_data):
        # 이미지 데이터를 validated_data에서 추출
        image = validated_data.pop('image', None)

        # Product 인스턴스 생성
        product = Product.objects.create(**validated_data)

        # 이미지가 있으면 설정
        if image:
            product.image = image
            product.save()

        return product


class ProductUpdateRequestSZ(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    price = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)
    image = serializers.ImageField(required=False, use_url=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price',)

    def create(self, validated_data):
        return Product.objects.create(**validated_data)


class ProductResponseSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True, help_text='상품 id')

    class Meta:
        model = Product
        fields = ('id', 'title', 'price',)
        read_only_field = ('id', 'title', 'price',)