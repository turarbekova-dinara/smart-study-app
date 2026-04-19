from django.urls import path
from .views import notes_list, delete_note

urlpatterns = [
  path('', notes_list),
  path('<int:pk>/', delete_note)
]
