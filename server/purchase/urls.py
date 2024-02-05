from django.urls import path

# from .views.ready import *
# from .views.approve import *
from .views.purchase import *
app_name = 'purchase'

urlpatterns = [
    path('verify_purchase', verify_purchase, name='verify_purchase')
    # path('ready/', kakaopay_ready, name='kakaopay_ready'),
    # path('approve/<int:purchase_pk>/', kakaopay_approve, name='kakaopay_approve')
]