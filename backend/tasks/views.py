from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer


class TaskList(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    tasks = Task.objects.filter(user=request.user).order_by("-id")
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


class TaskDetail(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get_object(self, request, pk):
    return Task.objects.get(id=pk, user=request.user)

  def put(self, request, pk):
    task = self.get_object(request, pk)
    serializer = TaskSerializer(task, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=400)

  def delete(self, request, pk):
    task = self.get_object(request, pk)
    task.delete()
    return Response({"message": "deleted"}, status=204)
