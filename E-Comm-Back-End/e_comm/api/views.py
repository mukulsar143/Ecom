from rest_framework.decorators import action
from django.shortcuts import get_list_or_404
from .serializer import *
from storeapp.models import *
from rest_framework.response import Response
from rest_framework.filters import SearchFilter

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.


class ProductViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    pagination_class = PageNumberPagination



class CategoryViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    http_method_names = ['get']
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer
    
    

class ReviewViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = ReviewSerializers
    
    def get_queryset(self):
        return Review.objects.filter(product_id = self.kwargs["product_pk"])
    
    
    def get_serializer_context(self):
        return {"product_id" : self.kwargs["product_pk"]}
    
    
class CartViewset(CreateModelMixin, RetrieveModelMixin, GenericViewSet, DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer  
    
class CartitemViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    http_method_names = ['get', 'post', 'patch', 'delete']
    
    def get_queryset(self):
        return Cartitems.objects.filter(cart_id = self.kwargs["cart_pk"])
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartSerializer
        
        if self.request.method == "PATCH":
            return UpdateCartSerializer
        
        return CartIemsSerializer
    
    
    def get_serializer_context(self):
        return {"cart_id" : self.kwargs['cart_pk']}
    
    
class OrderViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    @action(detail=False, methods=['POST'])
    def pay(self, request):
        order = self.get_object()
        amount = order.get_cart_total
        email = request.user.email
        redirect_url = "http://127.0.0.1:8000/api/payment/razorpay/"
        return Response({'message' : "payment Successfully"})
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateorderSerializer
        return OrderSerializer
    
    def get_serializer_context(self):
        print(self.request.user)
        return {"user_id" : self.request.user.id}
    
    def get_queryset(self):
        user = self.request.user
        if user:
            return Order.objects.all()
        else:
            return Order.objects.filter(user = user)
        
         


# @api_view(['GET', 'POST', 'PUT'])
# def api_products(request):
#     if request.method == 'GET':
#         products = Product.objects.all()
#         serializer = ProductSerializers(products, many = True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         data = request.data
#         serializer = ProductSerializers(data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
        
#         return Response({'message' : 'something went wrong', 'errors' : serializer.errors})
    
#     elif request.method == 'PUT':
#         data = request.data
#         Product
#         serializer = ProductSerializers(data = data)

# @api_view(['PUT', 'DELETE'])
# def api_pruduct(request, pk):
#     if request.method == 'PUT':
#         data = request.data
#         product = get_list_or_404(Product, id = pk)
#         serializer = ProductSerializers(product[0], data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
        
#         return Response({'errors' : serializer.errors, 'message' : 'invalid id'})
    
#     elif request.method == 'DELETE':
#         product = Product.objects.filter(id = pk)
#         if product:
#             product.delete()
#             return Response({'message' : 'successfully deleted'})
#         return  Response({'invalid id'})


# @api_view(['GET'])
# def api_category(request):
#     category = Category.objects.all()
#     serializer = ProductSerializers(category, many = True)
#     return Response(serializer.data)
    