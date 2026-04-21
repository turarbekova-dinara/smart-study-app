from rest_framework import serializers
from .models import Task, Note
from django.contrib.auth.models import User


# 1. ModelSerializer (Task)
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'


# 2. ModelSerializer (Note
class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = '__all__'


# 3. Simple Serializer (Login)
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()


# 4. Simple Serializer (Register)
class RegisterSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()
