from rest_framework import serializers
from django.core.files.storage import default_storage

from django.conf import settings
from ..models.product import Product,Size, ProductSize
import json

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['size']
        
class ProductSizeSerializer(serializers.ModelSerializer):
    size = serializers.ChoiceField(choices=Size.SIZE_CHOICES)

    class Meta:
        model = ProductSize
        fields = ('size', 'count',)
        
class ProductCreateSZ(serializers.ModelSerializer):
    sizes = ProductSizeSerializer(many=True)
    image_url = serializers.URLField(required=False)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('id',)


    def create(self, validated_data):
        sizes_data = validated_data.pop('sizes')
        product = super().create(validated_data)
        for size_data in sizes_data:
            size_value = size_data['size']
            size, _ = Size.objects.get_or_create(size=size_value)
            ProductSize.objects.create(product=product, size=size, count=size_data['count'])
        return product


    
class ProductImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

    def save(self, **kwargs):
        image_file = self.validated_data['image']
        file_name = default_storage.save(image_file.name, image_file)
        file_url = default_storage.url(file_name)

        return {'url': file_url}
    
    

class ProductListSZ(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()
    id = serializers.CharField(required=True, help_text='상품 id')

    class Meta:
        model = Product
        fields = ('id', 'created_at', 'modified_at', 'name', 'price', 'category', 'image_url', 'sizes')
        read_only_fields = ('id',)
        
    def get_sizes(self, obj):
        size_data = {size.size.size: size.count for size in obj.product_sizes.all()}
        
        return size_data
        

    
    
class ProductResponseSZ(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_field = ('id',)
        
    def get_sizes(self, obj):
        # `obj`는 `Product` 모델 인스턴스입니다.
        # `ProductSize` 모델을 쿼리하여 사이즈와 count를 가져옵니다.
        product_sizes = ProductSize.objects.filter(product=obj)
        
        # 각 사이즈와 count를 담을 dict 초기화합니다.
        size_data = {}
        
        # ProductSize 모델에서 가져온 정보를 사전에 추가합니다.
        for product_size in product_sizes:
            size_data[product_size.size.size] = product_size.count
        
        return size_data
        
    



class ProductUpdateRequestSZ(serializers.ModelSerializer):
    sizes = ProductSizeSerializer(many=True, required=False)
    
    class Meta:
        model = Product
        fields = ('id', 'created_at', 'modified_at', 'name', 'price', 'category', 'image_url', 'sizes')
        read_only_fields = ('id',)
        
    def update(self, instance, validated_data):
        sizes_data = validated_data.pop('sizes', None)
        instance = super().update(instance, validated_data)

        if sizes_data is not None:
            existing_sizes= {size.size: size for size in instance.sizes.all()}
            for size_data in sizes_data:
                size_value = size_data['size']
                count_value = size_data['count']
                if size_value in existing_sizes:
                    product_size = ProductSize.objects.get(product=instance, size=existing_sizes[size_value])
                    product_size.count = count_value
                    product_size.save()
                else:
                    # 새로운 사이즈는 생성
                    size, _ = Size.objects.get_or_create(size=size_value)
                    ProductSize.objects.create(product=instance, size=size, count=count_value)

        return instance
    

