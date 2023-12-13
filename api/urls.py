from django.urls import path, include
from django.conf import settings

from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView
from drf_spectacular.views import SpectacularRedocView

app_name = "api"

urlpatterns = [
    path('products/', include('products.urls')),
    path('user/', include('user.urls')),
    path('kakaopay/', include('kakaopay.urls')),
    path('purchase/', include('purchase.urls')),
    path('cart/', include('cart.urls'))
]

if settings.DEBUG:
    urlpatterns += [
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('swagger/', SpectacularSwaggerView.as_view(url_name='api:schema'), name='swagger-ui'),
        path('redoc/', SpectacularRedocView.as_view(url_name='api:schema'), name='redoc'),
    ]