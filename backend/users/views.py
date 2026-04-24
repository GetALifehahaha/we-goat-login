from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserRegisterSerializer, UserTokenObtainPairSerializer
# Create your views here.

class LoginView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]