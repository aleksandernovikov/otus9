from django.urls import path
from rest_framework.routers import DefaultRouter

from api.views import register_user, login_user

api_router = DefaultRouter()

urlpatterns = [
    path('login', login_user, name='login'),
    path('register', register_user, name='register')
]
urlpatterns += api_router.urls
