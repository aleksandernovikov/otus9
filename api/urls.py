from django.urls import path
from rest_framework.routers import DefaultRouter

from api.views import register_user, login_user, check_username

api_router = DefaultRouter()

urlpatterns = [
    path('check-username', check_username, name='check_username'),
    path('login', login_user, name='login'),
    path('register', register_user, name='register')
]
urlpatterns += api_router.urls
