from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import UserCreateSerializer

User = get_user_model()


@api_view(['POST'])
def register_user(request):
    serialized_user = UserCreateSerializer(data=request.data)

    if serialized_user.is_valid():
        instance = serialized_user.save()
        if instance:
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_user._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    data = request.data
    username, password = data.get('username'), data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)
