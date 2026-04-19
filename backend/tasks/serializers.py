from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ["id","title","completed","user"]
    read_only_fields= ["id","user"]
