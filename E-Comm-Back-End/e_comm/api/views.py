from rest_framework.decorators import action
from .serializers import *
from store.models import *
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
import razorpay 
from django.conf import settings
# Create your views here.

class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    pagination_class = PageNumberPagination

 
class CategoryViewset(ModelViewSet):
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
        return {"product_id" : self.kwargs['product_pk']}

class CartViewset(CreateModelMixin, RetrieveModelMixin, GenericViewSet, DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer  


class CartItemViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    lookup_field = 'cart_id'  # This should be the field used in URLs and queries

    def get_queryset(self):
        return Cartitems.objects.filter(cart_id=self.kwargs['cart_id'])

    def retrieve(self, request, *args, **kwargs):
        # Use filter to handle multiple items
        cart_items = self.get_queryset()
        if not cart_items:
            return Response({'error': 'No items found.'}, status=404)
        serializer = self.get_serializer(cart_items, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, id=self.kwargs['cart_id'])
        serializer = AddCartSerializer(data=request.data, context={'cart_id': cart.id})
        if serializer.is_valid():
            serializer.save(cart=cart)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        # Update multiple cart items by `cart_id`
        cart_items = self.get_queryset()
        updated_items = []
        for item in cart_items:
            serializer = UpdateCartSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                updated_items.append(serializer.data)
        if updated_items:
            return Response(updated_items)
        return Response({'error': 'No items found to update.'}, status=404)

    def destroy(self, request, *args, **kwargs):
        # Delete multiple cart items by `cart_id`
        cart_items = self.get_queryset()
        if cart_items:
            count, _ = cart_items.delete()
            return Response({'message': f'{count} items deleted.'}, status=204)
        return Response({'error': 'No items found to delete.'}, status=404)


    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartSerializer
        if self.request.method == 'PATCH':
            return UpdateCartSerializer
        return CartIemsSerializer

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart_id']}


class OrderViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        return OrderSerializer

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Order.objects.filter(user=user)
        return Order.objects.none()

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))

        amount = int(order.get_cart_total() * 100)  # Razorpay amount is in paisa (multiplied by 100)
        currency = 'INR'  # Change this according to your currency

        # Create a Razorpay order
        razorpay_order = client.order.create({
            'amount': amount,
            'currency': currency,
            'payment_capture': 1  # Auto capture payment
        })

        # Assuming you have a Razorpay order ID now (razorpay_order['id'])
        # You should save this razorpay_order['id'] in your Order model or somewhere to track payments

        return Response({
            'order_id': razorpay_order['id'],
            'amount': amount,
            'currency': currency,
            'message': 'Payment initiated successfully'
        })
