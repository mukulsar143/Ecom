from django_filters.rest_framework import FilterSet
from store.models import *


class ProductFilter(FilterSet):
    class Meta:
       model = Product
       fields = {
           'name' : {'exact'},
           'id' : {'exact'}
       }