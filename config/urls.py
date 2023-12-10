"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path,include
from django.urls import re_path
from django.conf import settings

from strawberry_django_jwt.decorators import jwt_cookie
from strawberry_django_jwt.views import StatusHandlingGraphQLView as GQLView

from config.schema import schema

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls"), name = "api"),
    re_path(r'^graphql/?$', jwt_cookie(GQLView.as_view(schema=schema))),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)