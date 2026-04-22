from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from api.views import api_login, api_logout

def home(request):
    return HttpResponse("Server working")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/login/', api_login, name='api_login'),
    path('api/logout/', api_logout, name='api_logout'),

    # Остальные пути (notes, tasks и т.д.)
    path('api/tasks/', include('tasks.urls')),
    path('api/notes/', include('notes.urls')),
    path('api/calendar/', include('calendar_app.urls')),]

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/', include('users.urls')),
  path('api/', include('tasks.urls')),
  path('events/', include('calendar_app.urls')),
  path('api/notes/', include('notes.urls'))
]




