from .models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate


def home(request):
    return HttpResponse("Bienvenue sur OldTopic !")



# Authentification & Gestion des Comptes
# class login_view(APIView):
#     def post(self, request):


#         return Response({"message": "Login endpoint"}, status=status.HTTP_200_OK)


class EtudiantRegistrationView(APIView):
    def post(self, request):
        serializers = EtudiantRegistrationSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Inscripton reussie"})
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)




class AjoutAdminView(APIView):
    def post(self, request):
        serializers = AjoutAdminSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Administrateur Ajouté avec succès"})
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    


class AdminUpdateView(APIView): 
    def put(self, request):
        user = request.user

        if not user.is_authenticated or not user.is_admin():
            return Response({"error": "Vous n'êtes pas autorisé"}, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data
        user.last_name = data.get('nom', user.first_name)
        user.set_password = data.get('password', user.password)
        user.save()

        return Response({"messages": "Vos Infos ont été mise a jour avec Succès"}, status=status.HTTP_200_OK)
    