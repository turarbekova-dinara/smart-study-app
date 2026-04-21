from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def notes_list(request):

  if request.method == "GET":
    notes = Note.objects.filter(user=request.user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

  if request.method == "POST":
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data)
    return Response(serializer.errors)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request, pk):
  note = Note.objects.get(id=pk, user=request.user)
  note.delete()
  return Response({"message": "deleted"})
