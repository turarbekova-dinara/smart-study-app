from django.urls import path
from .views import TaskListCreateAPIView, TaskDetailAPIView
from .views import login_view, register_view

urlpatterns = [
  path('tasks/', TaskListCreateAPIView.as_view()),
  path('tasks/<int:id>/', TaskDetailAPIView.as_view()),
  path('login/', login_view),
  path('register/', register_view),
]
