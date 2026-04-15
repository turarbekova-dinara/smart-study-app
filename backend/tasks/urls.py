from django.urls import path
from .views import TaskListCreate, TaskUpdateDelete

urlpatterns = [
  path('tasks/', TaskListCreate.as_view()),
  path('tasks/<int:pk>/', TaskUpdateDelete.as_view()),
]

