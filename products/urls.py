from django.urls import path
from products.views.views import ProductListCreateAV, ProductRetrieveUpdateDestroyAV

app_name = 'products'

urlpatterns = [
    path('', ProductListCreateAV.as_view(), name = 'product_list_create'),
    path('<int:pk>', ProductRetrieveUpdateDestroyAV.as_view(), name = 'product_update_destory'),
]
