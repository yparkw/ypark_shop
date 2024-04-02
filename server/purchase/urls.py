from django.urls import path

# from .views.ready import *
# from .views.approve import *
from purchase.views.purchase import *
from purchase.views.purchase_approval import *

app_name = 'purchase'

urlpatterns = [
    path('', purchaseListCreateAV.as_view(), name = 'purchase_list_create'),
    path('<int:pk>/all-detail/', purchase_detail, name = "purchase_detail"),
    path('<int:pk>/my-list/', purchase_my_list, name='purchase_my_list'),
    path('<int:pk>/status/', update_purchase_status, name='purchase_patch'),
    path('<int:pk>/reject/', reject_order, name='refund'),
]