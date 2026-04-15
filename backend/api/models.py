from django.db import models
from django.contrib.auth.models import User


# 1. Task model (ToDo)
class Task(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  category = models.ForeignKey('Category', on_delete=models.CASCADE, null=True, blank=True)
  title = models.CharField(max_length=255)
  completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title


# 2. Note model
class Note(models.Model):

  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='api_tasks')
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.content[:20]


# 3. User Profile (extra info)
class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  theme = models.CharField(max_length=10, default='light')  # dark/light

  def __str__(self):
    return self.user.username


# 4. Category model
class Category(models.Model):
  name = models.CharField(max_length=100)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.name
