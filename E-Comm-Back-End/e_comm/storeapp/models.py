from email.policy import default
from django.db import models
import uuid
from django.contrib.auth.models import User
from  django.conf import settings

# Create your models here.

# class profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name = 'profile')
#     username = models.CharField(max_length = 100, blank = True, null = True)
#     is_email_verified = models.BooleanField(default = False)
#     email_token = models.CharField(null = True, blank = True, max_length=50)
    
#     def __str__(self) -> str:
#         return str(self.user)
    
    
        
class Category(models.Model):
    title = models.CharField(max_length=200)
    category_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    slug = models.SlugField(default= None)
    featured_product = models.OneToOneField('Product', on_delete=models.CASCADE, blank=True, null=True, related_name='featured_product')
    icon = models.CharField(max_length=100, default=None, blank = True, null=True)

    def __str__(self):
        return self.title
    
    

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    discount = models. BooleanField(default=False)
    image = models.ImageField(upload_to = 'img',  blank = True, null=True, default='')
    old_price = models.FloatField(default=100.00)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')
    slug = models.SlugField(default=None)
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    inventory = models.IntegerField(default=5)
    top_deal=models.BooleanField(default=False)
    flash_sales = models.BooleanField(default=False)
    

    @property
    def price(self):
        if self.discount:
            new_price = self.old_price - ((30/100)*self.old_price)
        else:
            new_price = self.old_price
        return new_price
    
    @property
    def img(self):
        if self.image == "":
            self.image = ""
        
        return self.image

    def __str__(self):
        return self.name
    
class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.description    

class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank=True)
    cart_id = models.UUIDField(default=uuid.uuid4, auto_created=True, editable=False, primary_key=True)
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
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True, related_name = 'items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name='cartitems')
    quantity = models.IntegerField(default=0)
    
    
    @property
    def subTotal(self):
        total = self.quantity * self.product.price
        
        return total
    
    
    
   

class SavedItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    added = models.IntegerField(default=0)
    
    
    
    def __str__(self):
        return str(self.id)
    
    
   
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, blank = True, related_name = "orders")
    date_ordered = models.DateTimeField(auto_now_add = True)
    complete = models.BooleanField(default = False, null = True, blank = True)
    # coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null = True, blank = True)
    
    def __str__(self) -> str:
        return str(self.id)
    
    @property
    def get_cart_total(self):
        items = self.items.all()
        total = sum([item.quantity * item.product.price for item in items])   
        return total

        
    
    @property
    def get_cart_item(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total
    
    # @property
    # def shipping(self):
    #     shipping = False
    #     orderitem = self.orderitem_set.all()
    #     for i in orderitem:
    #         if i.product.digital == False:
    #             shipping = True
    #     return shipping        
    
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null = True, blank = True)
    order_item = models.ForeignKey(Order, on_delete=models.SET_NULL, null = True, blank = True, related_name = "items")
    quantity = models.IntegerField(default = 0, null = True, blank = True)
    order_add = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return str(self.id)
    
    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total    
     