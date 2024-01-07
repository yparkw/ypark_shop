from django.urls import path
from cart.views.cart import CartView, CartItemDeleteView


app_name = 'cart'


urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/delete/<int:pk>/', CartItemDeleteView.as_view(), name='cart-item-delete'),

]