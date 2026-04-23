from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = "__all__"
    read_only_fields = ["user"]


class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()
  email = serializers.EmailField()
