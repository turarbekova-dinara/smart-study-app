from django.urls import path
from .views import get_notes

urlpatterns = [
  path('', get_notes),
]
