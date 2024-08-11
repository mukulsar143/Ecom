from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    ProductViewset, 
    CategoryViewset, 
    ReviewViewset, 
    CartViewset, 
    CartItemViewset, 
    OrderViewset
)

router = DefaultRouter()
router.register('products', ProductViewset, basename='products')
router.register('categories', CategoryViewset, basename='categories')
router.register('cart', CartViewset, basename='cart')
router.register('orders', OrderViewset, basename='orders')

urlpatterns = [
    path('', include(router.urls)),
    path('products/<int:product_pk>/reviews/', ReviewViewset.as_view({'get': 'list', 'post': 'create'}), name='product-reviews'),
    path('cart/<uuid:cart_id>/items/', CartItemViewset.as_view({'get': 'list', 'post': 'create', 'patch': 'partial_update', 'delete' : 'destroy'}), name='cart-items')
]
