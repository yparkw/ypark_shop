from rest_framework import serializers

from user.models import User


class ProfileSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(help_text='유저 id')

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone', 'address', 'detailAddress', 'postCode', 'points')
        read_only_fields = ('id', 'email',)


class PatchProfileSZ(serializers.ModelSerializer):
    id = serializers.IntegerField(help_text='유저 id')

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'phone', 'address', 'detailAddress','postCode', 'points')
        read_only_fields = ('id', 'email',)

    def update(self, instance, validated_data):
        return super(PatchProfileSZ, self).update(instance, validated_data)
    
    
