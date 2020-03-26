from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'email', 'username', 'password'

    def create(self, validated_data):
        try:
            return User.objects.create_user(
                email=validated_data['email'],
                username=validated_data['username'],
                password=validated_data['password']
            )
        except IntegrityError as e:
            print(e)
            raise serializers.ValidationError({'username': 'Такое имя пользователя уже используются.'})
