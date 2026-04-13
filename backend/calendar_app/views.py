from django.http import JsonResponse

def get_events(request):
  return JsonResponse({"message": "ok"})
