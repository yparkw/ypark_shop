from rest_framework import serializers
from purchase.models.purchase import Purchase, PurchaseItem

import logging
logger = logging.getLogger(__name__)

class PurchaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseItem
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    products = PurchaseItemSerializer(many=True)

    class Meta:
        model = Purchase
        fields = [
            'id', 'imp_uid', 'merchant_uid', 'amount', 'status', 
            'buyer_name', 'buyer_email', 'buyer_tel', 'buyer_address', 
            'buyer_detailAddress', 'buyer_postcode', 'products'
        ]
        
    def create(self, validated_data):
        logger.debug(validated_data)
        items_data = validated_data.pop('products')
        
        purchase = Purchase.objects.create(**validated_data)
        for item_data in items_data:
            PurchaseItem.objects.create(purchase=purchase, **item_data)
        return purchase