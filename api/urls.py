from django.urls import path, include
from django.conf import settings

from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView
from drf_spectacular.views import SpectacularRedocView

app_name = "api"

urlpattenrs = [
    path('products/', include('products.urls'))
]