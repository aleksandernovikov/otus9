from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'email', 'username', 'password'

    def create(self, validated_data):
        try:
            return User.objects.create_user(
                validated_data['email'],
                validated_data['username'],
                validated_data['password']
            )
        except IntegrityError:
            raise serializers.ValidationError({'username': 'Такое имя пользователя уже используются.'})
