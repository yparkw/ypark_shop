from django.urls import path

# from .views.ready import *
# from .views.approve import *
from .views.purchase import *
app_name = 'purchase'

urlpatterns = [
    path('verify_purchase', verify_purchase, name='verify_purchase'),
    path('update/<int:pk>', update_to_shipping, name='shipping'),
    path('reject/<int:pk>', reject_order, name='refund'),
]