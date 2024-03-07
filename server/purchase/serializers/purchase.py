from rest_framework import serializers
from purchase.models.purchase import Purchase, PurchaseItem
from products.models.product import Product

import logging
logger = logging.getLogger(__name__)

class PurchaseItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product')

    class Meta:
        model = PurchaseItem
        fields = ('product_id', 'quantity', 'size')

class PurchaseListSZ(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'
        
class PurchaseSerializer(serializers.ModelSerializer):
    products = PurchaseItemSerializer(many=True, source='items')

    class Meta:
        model = Purchase
        fields = (
            'id', 'imp_uid', 'merchant_uid', 'amount', 'status', 
            'buyer_name', 'buyer_email', 'buyer_tel', 'buyer_address', 
            'buyer_detailAddress', 'buyer_postcode', 'products'
        )

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        purchase = Purchase.objects.create(**validated_data)
        for item_data in items_data:
            PurchaseItem.objects.create(purchase=purchase, **item_data)
        return purchase

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', [])
        
        # Purchase 인스턴스의 기존 필드 업데이트
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # 중첩된 PurchaseItem 인스턴스 처리
        for item_data in items_data:
            item_id = item_data.get('id', None)
            if item_id:
                # 기존 PurchaseItem 인스턴스 업데이트
                item = PurchaseItem.objects.get(id=item_id, purchase=instance)
                for item_attr, item_value in item_data.items():
                    setattr(item, item_attr, item_value)
                item.save()
            else:
                # 새 PurchaseItem 인스턴스 생성
                PurchaseItem.objects.create(purchase=instance, **item_data)
        
        return instance