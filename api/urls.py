from django.urls import path, include
from django.conf import settings

from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView
from drf_spectacular.views import SpectacularRedocView

app_name = "api"

urlpattenrs = [
    path('products/', include('products.urls'))
]

if settings.DEBUG:
    urlpattenrs += [
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('swagger/', SpectacularSwaggerView.as_view(url_name='api:schema'), name='swagger-ui'),
        path('redoc/', SpectacularRedocView.as_view(url_name='api:schema'), name='redoc'),
    ]