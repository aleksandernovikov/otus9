from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import UserCreateSerializer

User = get_user_model()


@api_view(['GET'])
def check_username(request):
    username = request.query_params.get('username')
    user_exists = User.objects.filter(username=username).exists()

    if user_exists:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    serialized_user = UserCreateSerializer(data=request.data)

    if serialized_user.is_valid(raise_exception=True):
        instance = serialized_user.save()
        if instance:
            return Response(status=status.HTTP_201_CREATED)

    return Response(
        serialized_user._errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def login_user(request):
    data = request.data
    username, password = data.get('username'), data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)
