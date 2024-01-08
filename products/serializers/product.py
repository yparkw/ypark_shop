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
    sizes = ProductSizeSerializer(source='product_sizes', many=True, read_only=True)
    id = serializers.CharField(required=True, help_text='상품 id')

    class Meta:
        model = Product
        fields = ('id', 'created_at', 'modified_at', 'name', 'price', 'category', 'image_url', 'sizes')
        read_only_fields = ('id',)

class ProductResponseSZ(serializers.ModelSerializer):
    sizes = ProductSizeSerializer(source='product_sizes', many=True, read_only=True)
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_field = ('id',)

    



class ProductUpdateRequestSZ(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    price = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price',)

    def create(self, validated_data):
        return Product.objects.create(**validated_data)