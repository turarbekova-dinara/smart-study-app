from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.contrib.auth.models import User

# 1. ALL TASKS + CREATE
class TaskListCreateAPIView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    # тек сол user-дің task-тарын алу
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
      # user автоматты түрде қосылады
      serializer.save(user=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 2. DETAIL / UPDATE / DELETE
class TaskDetailAPIView(APIView):
  permission_classes = [IsAuthenticated]

  def get_object(self, id, user):
    try:
      return Task.objects.get(id=id, user=user)
    except Task.DoesNotExist:
      return None

  def get(self, request, id):
    task = self.get_object(id, request.user)
    if not task:
      return Response({'error': 'Not found'}, status=404)

    serializer = TaskSerializer(task)
    return Response(serializer.data)

  def put(self, request, id):
    task = self.get_object(id, request.user)
    if not task:
      return Response({'error': 'Not found'}, status=404)

    serializer = TaskSerializer(task, data=request.data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data)

    return Response(serializer.errors, status=400)

  def delete(self, request, id):
    task = self.get_object(id, request.user)
    if not task:
      return Response({'error': 'Not found'}, status=404)

    task.delete()
    return Response({'status': 'deleted'})

@api_view(['POST'])
def login_view(request):
  username = request.data.get('username')
  password = request.data.get('password')

  user = authenticate(username=username, password=password)

  if user is not None:
    token, created = Token.objects.get_or_create(user=user)

    return Response({
      'token': token.key
    })

  return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST', 'GET'])
def register_view(request):
  username = request.data.get('username')
  password = request.data.get('password')

  if User.objects.filter(username=username).exists():
    return Response({'error': 'User exists'}, status=400)

  user = User.objects.create_user(username=username, password=password)
  token = Token.objects.create(user=user)


  return Response({
    'token': token.key
  })


def perform_create(self, serializer):
  serializer.save(user=self.request.user)


