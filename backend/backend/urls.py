"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from users.views import (LoginView, CreateUserView, GetUserInformation)
from django.http import HttpResponse

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/login/', LoginView.as_view(), name='token_obtain_pair'),
    path('users/register/', CreateUserView.as_view(), name='user_register'),
    path('users/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', GetUserInformation.as_view(), name="me"),
    path('', health_check),

]
