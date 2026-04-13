from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include

def home(request):
    return HttpResponse("Server working")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/tasks/',include('tasks.urls')),
    path('api/notes/', include('notes.urls')),
    path('api/calendar/', include('calendar_app.urls')),
]
