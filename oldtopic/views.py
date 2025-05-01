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
class Etudiantlogin_view(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is not None:
            if user.is_etudiant() and user.is_active:
                self.envoie_mail_de_signal(user.email, user.last_name)
                return Response({"message": "connexion Réussi", "role":"etudiant"}, status=status.HTTP_200_OK)
            elif not user.is_active:
                return Response({"error": "Votre compte n'est pas activé."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"error": "Votre compte n'est pas autorisé a se connecter ici."}, status=status.HTTP_403_FORBIDDEN)
        else:
            self.envoie_mail_de_prevention(user.email, user.last_name)
            return Response({"error": "Email ou mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)    
    
    def envoie_mail_de_signal(self, email, nom):
        send_mail(
            subject="de connexion à OldTopic",
            message = f"Bonjour {nom}, Vous avez tenter de vous connecter a votre compte OldTopic. Si vous n'y êtes pour rien veuillez Changer de Mot de passe",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )

    def envoie_mail_de_prevention(self, email, nom):
        send_mail(
            subject="Tentative de connexion à OldTopic",
            message = f"Attention {nom}, Quelqu'un tente de se connecter à votre compte OldTopic. Si vous n'y êtes pour rien veuillez Changer de Mot de passe dès maintenant",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )


class Adminlogin_view(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is not None:
            if user.is_etudiant() and user.is_active:
                self.envoie_mail_de_signal(user.email, user.last_name)
                return Response({"message": "connexion Réussi", "role":"admin"}, status=status.HTTP_200_OK)
            elif not user.is_active:
                return Response({"error": "Votre compte n'est pas activé."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"error": "Votre compte n'est pas autorisé a se connecter ici."}, status=status.HTTP_403_FORBIDDEN)
        else:
            self.envoie_mail_de_prevention(user.email, user.last_name)
            return Response({"error": "Email ou mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)  

    def envoie_mail_de_signal(self, email, nom):
        send_mail(
            subject="Tentative de connexion à OldTopic",
            message = f"Bonjour Admin {nom}, Vous avez tenter de vous connecter a votre compte OldTopic. \nSi vous n'y êtes pour rien veuillez le signaler dès maintenant au SuperAdmin \nou Changer de Mot de passe.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )  


    def envoie_mail_de_prevention(self, email, nom):
        send_mail(
            subject="Tentative de connexion à OldTopic",
            message = f"Attention {nom}, Quelqu'un tente de se connecter à votre compte OldTopic. Si vous n'y êtes pour rien veuillez Changer de Mot de passe dès maintenant",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )


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
    