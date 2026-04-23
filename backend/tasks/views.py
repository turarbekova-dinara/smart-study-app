from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone

from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tasks(request):

  tasks = Task.objects.filter(user=request.user)

  serializer = TaskSerializer(tasks, many=True)

  return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_task(request):

  serializer = TaskSerializer(data=request.data)

  if serializer.is_valid():

    serializer.save(user=request.user)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task(request, id):

  task = Task.objects.get(id=id)

  completed = request.data.get("completed")

  task.completed = True if str(completed).lower() == "true" else False

  if task.completed:
    task.completed_at = timezone.now()
  else:
    task.completed_at = None

  task.save()

  serializer = TaskSerializer(task)

  return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request, id):

  task = Task.objects.get(id=id)

  task.delete()

  return Response({"deleted": True})
