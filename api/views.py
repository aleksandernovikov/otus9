from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import UserSerializer

User = get_user_model()


@api_view(['POST'])
def register_user(request):
    serialized_user = UserSerializer(data=request.DATA)
    if serialized_user.is_valid():
        instance = serialized_user.save()
        if instance:
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_user._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    return Response()
