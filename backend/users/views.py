from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json

def register(request):
  if request.method == 'POST':
    data = json.loads(request.body)

    User.objects.create_user(
      username=data['username'],
      password=data['password']
    )

    return JsonResponse({'status': 'ok'})


def login(request):
  if request.method == 'POST':
    data = json.loads(request.body)

    user = authenticate(
      username=data['username'],
      password=data['password']
    )

    if user:
      return JsonResponse({'status': 'ok'})
    else:
      return JsonResponse({'status': 'error'})
