from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TaskListCreate(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

  def post(self, request):
    data = request.data.copy()
    data['user'] = request.user.id

    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)

    return Response(serializer.errors)


class TaskUpdateDelete(APIView):
  permission_classes = [IsAuthenticated]

  def put(self, request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)

  def delete(self, request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response({"message": "Deleted"})
