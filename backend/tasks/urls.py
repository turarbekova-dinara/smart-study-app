from django.urls import path
from .views import *

urlpatterns = [

  path("tasks/",tasks),
  path("tasks/add/",add_task),
  path("tasks/update/<int:id>/",update_task),
  path("tasks/delete/<int:id>/",delete_task)
]
