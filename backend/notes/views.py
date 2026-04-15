from django.http import JsonResponse

def get_notes(request):
  return JsonResponse({"notes": ["note1", "note2"]})
