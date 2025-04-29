from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Sujet
from .serializers import SujetSerializer

from django.http import HttpResponse


def home(request):
    return HttpResponse("Bienvenue sur OldTopic !")


class SujetListView(APIView):
    def get(self, request):
        sujets = Sujet.objects.all()
        serializer = SujetSerializer(sujets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SujetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SujetDetailView(APIView):
    def get(self, request, pk):
        try:
            sujet = Sujet.objects.get(pk=pk)
            serializer = SujetSerializer(sujet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Sujet.DoesNotExist:
            return Response({"error": "Sujet non trouvé"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            sujet = Sujet.objects.get(pk=pk)
            serializer = SujetSerializer(sujet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Sujet.DoesNotExist:
            return Response({"error": "Sujet non trouvé"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            sujet = Sujet.objects.get(pk=pk)
            sujet.delete()
            return Response({"message": "Sujet supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Sujet.DoesNotExist:
            return Response({"error": "Sujet non trouvé"}, status=status.HTTP_404_NOT_FOUND)