from django.http import JsonResponse

def get_tasks(request):
  return JsonResponse({"tasks": ["task1", "task2"]})
