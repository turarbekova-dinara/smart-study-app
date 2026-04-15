from django.urls import path
from .views import register, login, test, logout

urlpatterns = [
  path('register/', register),
  path('login/', login),
  path('test/', test),
  path('logout/', logout),
]
