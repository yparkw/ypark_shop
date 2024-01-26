from django.urls import path

from .views.ready import *
from .views.approve import *

app_name = 'purchase'

urlpatterns = [
    path('ready/', kakaopay_ready, name='kakaopay_ready'),
    path('approve/<int:purchase_pk>/', kakaopay_approve, name='kakaopay_approve')
]