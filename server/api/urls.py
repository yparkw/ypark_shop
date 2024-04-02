from django.urls import path, include, re_path
from django.conf import settings

from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView
from drf_spectacular.views import SpectacularRedocView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

app_name = "api"

urlpatterns = [
    path('products/', include('products.urls')),
    path('user/', include('user.urls')),
    path('kakaopay/', include('kakaopay.urls')),
    path('purchase/', include('purchase.urls')),
    path('cart/', include('cart.urls'))
]

schema_view = get_schema_view(
    openapi.Info(
        title="API 문서",
        default_version='v1',
        description="API 설명",
        terms_of_service="URL",
        contact=openapi.Contact(email="contact@yourapi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

if settings.DEBUG:
    urlpatterns += [
        # 기존 URL 패턴들...
        path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
        path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    ]