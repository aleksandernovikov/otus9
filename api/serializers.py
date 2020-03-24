from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'email', 'username', 'password'

    def create(self, validated_data):
        return User.objects.create_user(
            validated_data['email'],
            validated_data['username'],
            validated_data['password']
        )
