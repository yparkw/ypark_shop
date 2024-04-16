from django.urls import path
from products.views.product import ProductListCreateAV, ProductRetrieveUpdateDestroyAV
from products.views.image import ImageUploadView
from products.views.product import *

app_name = 'products'

urlpatterns = [
    path('', ProductListCreateAV.as_view(), name = 'product_list_create'),
    path('images/', ProductImageUploadAV.as_view(), name='product_image_upload'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyAV.as_view(), name = 'product_update_destory'),
    # path('delete/<int:pk>/', ProductDeleteView.as_view(), name = 'product_delete'),
    
]
