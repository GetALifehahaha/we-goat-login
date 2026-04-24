from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # embed data into JWT payload
        token['id'] = user.id
        token['username'] = user.username

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        data['token'] = data.pop('access')

        data['user'] = UserSerializer(self.user).data

        return data
    

class UserRegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password']

    def create(self, validated_data):

        user = User(
            email=validated_data.get('email', ''),
            username=validated_data.get('username', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )

        user.set_password(validated_data['password'])
        user.save()

        return user