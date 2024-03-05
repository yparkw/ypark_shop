from django.urls import path

# from .views.ready import *
# from .views.approve import *
from purchase.views.purchase import *
from purchase.views.purchase_approval import *

app_name = 'purchase'

urlpatterns = [
    path('', purchaseListCreateAV.as_view(), name = 'purchase_list_create'),
    path('verify_purchase', verify_purchase, name='verify_purchase'),
    path('update/<int:pk>', update_to_shipping, name='shipping'),
    path('reject/<int:pk>', reject_order, name='refund'),
]