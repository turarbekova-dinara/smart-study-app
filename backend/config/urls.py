from calendar_app.views import EventList
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import permission_classes

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/', include('users.urls')),
  path('api/', include('tasks.urls')),
  path("tasks/",include("tasks.urls")),
  path("users/",include("users.urls")),
  path("events/",include('calendar_app.urls')),
]




