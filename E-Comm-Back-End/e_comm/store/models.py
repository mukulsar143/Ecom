# storeapp/models.py
from django.db import models
from django.contrib.auth.models import User
import uuid

class Category(models.Model):
    title = models.CharField(max_length=200)
    category_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    slug = models.SlugField(default= None)
    featured_product = models.OneToOneField('Product', on_delete=models.CASCADE, blank=True, null=True, related_name='featured_product')
    icon = models.CharField(max_length=100, default=None, blank = True, null=True)

    def __str__(self):
        return self.title
    
    

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    discount = models.FloatField()
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')    
    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()

class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, auto_created=True, editable=False, primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    session_id = models.CharField(max_length=100)
    
    @property
    def num_of_items(self):
        cartitems = self.cartitems_set.all()
        qtysum = sum([ qty.quantity for qty in cartitems])
        return qtysum
    
    @property
    def cart_total(self):
        cartitems = self.cartitems_set.all()
        qtysum = sum([ qty.subTotal for qty in cartitems])
        return qtysum

    def __str__(self):
        return str(self.cart_id)


class Cartitems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def cart_id(self):
        return self.cart.id  # This ensures you have access to `cart_id`

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)

class OrderItem(models.Model):
    order_item = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
