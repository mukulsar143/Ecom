from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

router = routers.DefaultRouter()

router.register("products", ProductViewset)
router.register("category", CategoryViewset)
router.register("carts", CartViewset)
router.register("order", OrderViewset, basename="orders")

product_router = routers.NestedDefaultRouter(router, "products", lookup = "product")
product_router.register("reviews", ReviewViewset, basename="product")

cart_item = routers.NestedDefaultRouter(router, "carts", lookup = 'cart')
cart_item.register("items", CartitemViewset, basename="items")


urlpatterns = [
    path("", include(router.urls)),
    path("", include(product_router.urls)),
    path("", include(cart_item.urls)),

]