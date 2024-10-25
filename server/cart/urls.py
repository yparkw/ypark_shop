from django.urls import path
from cart.views.cart import CartView, CartItemDeleteView


app_name = 'cart'

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('<int:pk>/', CartItemDeleteView.as_view(), name='cart-item-delete'),

]