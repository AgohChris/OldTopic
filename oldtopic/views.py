from .models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.mail import send_mail


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


class VerifierCodeView(APIView):
    def post(self, request):
        # email = request.data.get('email')
        code = request.data.get('code')
        try:
            user = User.objects.get(verification_code=code)
            user.is_active = True #on active le compte
            user.verification_code = None #puis on supprime le code de vérification qu'on a génnerer
            user.save()
            
            self.envoie_mail_succes(user.email, user.last_name)
            return Response({"message": "Votre Compte à été activer avec succè"}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({"message": "Votre code est incorrect ou invalide"}, status=status.HTTP_400_BAD_REQUEST)


    def envoie_mail_succes(self, email, nom):
        send_mail(
            subject="Compte OldTopic activer",
            message = f"Bonjour {nom}, Votre compte à est désormais actif vous pouvez vous connecter et reviser en toute tranquilité.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )


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
    