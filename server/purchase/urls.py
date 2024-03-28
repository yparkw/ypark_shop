from django.urls import path

# from .views.ready import *
# from .views.approve import *
from purchase.views.purchase import *
from purchase.views.purchase_approval import *

app_name = 'purchase'

urlpatterns = [
    path('', purchaseListCreateAV.as_view(), name = 'purchase_list_create'),
    path('verify_purchase', verify_purchase, name='verify_purchase'),
    path('<int:pk>/', update_purchase_status, name='purchase_patch'),
    path('detail/<int:pk>', purchase_detail, name = "purchase_detail"),
    path('reject/<int:pk>', reject_order, name='refund'),
]