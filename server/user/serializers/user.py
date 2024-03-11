from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'address', 'detailAddress', 'postCode', 'is_active', 'is_admin', 'is_staff']



class UserListSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(help_text='유저 id')

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone', 'address', 'detailAddress','postCode', 'is_active', 'is_staff', 'is_admin',)
        read_only_fields = ('id',)
        

class UserUpdateRequestSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(help_text='유저 id')
    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone', 'address', 'detailAddress','postCode', 'is_active', 'is_staff', 'is_admin',)
        read_only_fields = ('id',)
        
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        return instance