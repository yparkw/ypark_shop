from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class UserListSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(help_text='유저 id')

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone', 'address', 'detailAddress','postCode', 'is_active', 'is_staff', 'is_admin',)
        read_only_fields = ('id',)