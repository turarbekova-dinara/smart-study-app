from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json


def login_view(request):
  if request.method == 'POST':
    data = json.loads(request.body)

    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
      return JsonResponse({'status': 'ok'})
    else:
      return JsonResponse({'status': 'error'})

  return JsonResponse({'error': 'only POST allowed'})


def register_view(request):
  if request.method == 'POST':
    data = json.loads(request.body)

    username = data.get('username')
    password = data.get('password')

    if User.objects.filter(username=username).exists():
      return JsonResponse({'status': 'exists'})

    User.objects.create_user(username=username, password=password)
    return JsonResponse({'status': 'ok'})

  return JsonResponse({'error': 'only POST allowed'})
