from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserRegister(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        if User.objects.filter(email = data['email']).exists():
            raise serializers.ValidationError("Email already exists")
        
        return data
    
    def create(self, data):
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            username = data['email']
        )
        user.set_password(data['password'])
        user.save()
        
        return data
    
class UserLogin(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()
    
    
    def validate(self, data):
        if not User.objects.filter(username = data['username']).exists():
            raise serializers.ValidationError("Email Not Found")
                
        return data
    
    def get_token(self, validated_data):
        
        user = authenticate(username=validated_data['username'], password=validated_data['password'])
        
    
        if not user:
            raise serializers.ValidationError("Invalid credentials")  
        
        token, _ = Token.objects.get_or_create(user = user)
              
        return {'success' : True, 'token' : str(token.key)}
        