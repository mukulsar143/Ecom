from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import *
from rest_framework import status

# Create your views here.

class Register(APIView):
    def post(self, request):
        data = request.data
        serializer = UserRegister(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response( {'data' : serializer.data, 'success' : True})
        
        return Response({'status' : 400, 'message' : 'Some Errors Occurance', 'errors ': serializer.errors})    
    
    
class LoginUser(APIView):
    def post(self, request):
        data = request.data
        serializer = UserLogin(data = data)
        if serializer.is_valid():
            responce = serializer.get_token(data)        
            return Response(responce, status=status.HTTP_202_ACCEPTED) 
                    
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)  
        