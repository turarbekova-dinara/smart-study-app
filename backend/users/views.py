from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
  request.user.auth_token.delete()
  return Response({"message": "Logged out"})


@api_view(['GET'])
def test(request):
  return Response({"msg": "ok"})

@api_view(['POST'])
def register(request):
  username = request.data['username']
  password = request.data['password']

  user = User.objects.create_user(
    username=username,
    password=password
  )

  return Response({
    "message": "User created"
  })

@api_view(['POST'])
def login(request):
  username = request.data['username']
  password = request.data['password']

  user = authenticate(username=username, password=password)

  if user:
    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})
  else:
    return Response({"error": "Invalid credentials"})
