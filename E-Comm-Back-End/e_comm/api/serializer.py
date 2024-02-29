from rest_framework import serializers
from storeapp.models import *
from django.db import transaction


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description','discount', 'slug', 'price']
                
        
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' 

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['name', 'description']
 
    def create(self, validated_data):
        product_id = self.context["product_id"]
        return Review.objects.create(product_id = product_id, **validated_data)
            

class CartIemsSerializer(serializers.ModelSerializer):
    subTotal = serializers.SerializerMethodField(method_name="total")
    product = ProductSerializers(many = False)
    class Meta:
        model = Cartitems
        fields = ['id', 'cart', 'product', 'quantity', "subTotal"]      
        
    def total(self, cartitem:Cartitems):
        return cartitem.quantity * cartitem.product.price    
        
class CartSerializer(serializers.ModelSerializer):
    items = CartIemsSerializer(many = True, read_only = True)
    cart_id = serializers.UUIDField(read_only = True)
    cart_total = serializers.SerializerMethodField(method_name="grand_total")
    class Meta:
        model = Cart
        fields = ['cart_id', 'items', 'cart_total']  
        
    def grand_total(self, cart:Cart):
        items = cart.items.all()
        total = sum([item.quantity * item.product.price for item in items])
        return total
    
    
class AddCartSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField()
    class Meta:
        model = Cartitems
        fields = ['id', 'product_id', 'quantity']   
        
    def validate_product_id(self, value):
        if not Product.objects.filter(pk = value).exists():
            raise serializers.ValidationError("Invalid UUID of Products")
        
        return value
                
    def save(self, **kwargs):
        product_id = self.validated_data['product_id']
        cart_id = self.context['cart_id']
        quantity = self.validated_data['quantity']  
        
        try:
            additems = Cartitems.objects.get(product_id = product_id, cart_id = cart_id)
            additems.quantity += quantity
            additems.save() 
            
            self.instance = additems
            
        except:
            self.instance = Cartitems.objects.create(cart_id = cart_id, **self.validated_data)
            
        return self.instance          
           
class UpdateCartSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cartitems
        fields = ['quantity']     
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'order_item', 'quantity']  
        
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many = True, read_only = True)
    class Meta:
        model = Order
        fields = ['id', 'user','complete', 'items']      
        
        
        
class CreateorderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()
    
    def save(self, **kwargs):
        cart_id = self.validated_data['cart_id']
        user_id = self.context["user_id"]
        order = Order.objects.create(user_id  = user_id)
        cartitem = Cartitems.objects.filter(cart_id = cart_id)
        orderitems = [OrderItem(order_item = order, product =item.product, quantity = item.quantity) for item in cartitem]
        OrderItem.objects.bulk_create(orderitems)
        Cart.objects.filter(cart_id = cart_id).delete()        
        return order
