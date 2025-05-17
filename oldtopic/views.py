from django.utils import timezone
from .models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.hashers import make_password

import pandas as pd
from PyPDF2 import PdfReader
import tempfile
import os
from tabula import convert_into
from rest_framework.parsers import MultiPartParser, FormParser
from PyPDF2 import PdfReader



def home(request):
    return HttpResponse("Bienvenue sur OldTopic !")



#================ Authentification & Gestion des Comptes ====================

#================================================ Etudiant ===================================
# login Etudiant
class Etudiantlogin_view(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is not None:
            if user.is_etudiant() and user.is_active:
                request.session['user_id'] = user.id  # Stocker l'ID utilisateur dans la session
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


# Inscription Etudiant
class EtudiantRegistrationView(APIView):
    def post(self, request):
        serializers = EtudiantRegistrationSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Inscripton reussie"})
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


# Etudiant Modifie son password

class EtudiantModifieMdpview(APIView):
    def put(self, request):
        # user = request.user  # Identifiez l'utilisateur connecté directement
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "Utilisateur non identifié. Veuillez vous connecter."}, status=status.HTTP_401_UNAUTHORIZED)
       
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable."}, status=status.HTTP_404_NOT_FOUND)

        
        if not user.is_etudiant():
            return Response({"error": "Vous n'êtes pas un étudiant"}, status=status.HTTP_403_FORBIDDEN)

        serializer = EtudiantModifieMdpSerializer(data=request.data)
        if serializer.is_valid():
            ancien_mdp = serializer.validated_data['ancien_mdp']
            nouveau_mdp = serializer.validated_data['nouveau_mdp']
            # confirm_nouveau_mdp = serializer.validate['confirm_nouveau_mdp']

            if not user.check_password(ancien_mdp):
                return Response({"error":"L'ancien mot de passe ne correspond pas"}, status=status.HTTP_400_BAD_REQUEST)
            if ancien_mdp == nouveau_mdp:
                return Response({"error":"le nouveau mot de passe n'est pas different de l'ancien"}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(nouveau_mdp)
            user.save()

            self.envoie_mail_de_signal(user.email, user.first_name)

            return Response({"message":"Votre mot de passe à été modifier!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def envoie_mail_de_signal(self, email, nom):
        send_mail(
            subject="Modification du mot de passe de votre compte OldTopic",
            message=f"Bonjour {nom}, votre mot de passe a été modifié avec succès."
                    f"\nSi vous n'êtes pas à l'origine de cette modification, veuillez le signaler dès maintenant.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )


# Verification de code a 6 chiffre lors de l'inscription de l'étudiant
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


# Reinitialisation du mot de passe pour l'étudiant
class MdpResetRequestView(APIView):
    def post(self, request):
        serializers = mdpResetRequestSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Un code de réinitalisation à été envoyé a votre adresse email"}, status=status.HTTP_200_OK)
        
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Verification du code a 6 chiffres pour la reinitialisation ==> Pour l'Étudiant
class VerifCodeReinitialisationView(APIView):
    def post(self, request):
        serializer = verifCodeReinitialisationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            request.session['user_id'] = user.id
            return Response({"message": "Code valide.", "email": user.email}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   
# Enregistrement du nouveau mot de passe ==> ==> Pour l'Étudiant
class NouveauMotDePasseView(APIView):
    def post(self, request):
        user_id = request.session.get('user_id') 
        if not user_id:
            return Response({"error": "Utilisateur non identifié. Veuillez recommencer le processus."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable."}, status=status.HTTP_404_NOT_FOUND)

        # Validation et enregistrement du nouveau mot de passe
        serializer = NouveauMotDePasseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response({"message": "Mot de passe réinitialisé avec succès."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Abonnement a la newsletter ==> Pour l'Étudiant
class AbonnementNewsletterView(APIView):
    def post(self, request):
        serializers = NewsLetterEmailSendSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"message": "Inscription a la newsletter"}, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Desabonnement a la newsletter ==> Pour l'Étudiant
class DesabonnementNewsletter(APIView):
    def delete(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error":"Pour vous désabonner, l'email est requis."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            abonnement = newletter.objects.get(email=email)
            abonnement.delete()

            return Response({"messsage": "Désonscription réussie."}, status=status.HTTP_200_OK)
        except newletter.DoesNotExist:
            return Response({"error":"Cet email n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)
        

# Enregistrement de la newsletter ==> Pour l'Étudiant
class NewsLetterMessageView(APIView):
    def post(self, request):

        serializer = NewsletterMessageSerializer(data=request.data)
        if serializer.is_valid():
            message  = serializer.save()
            return Response({"message":"Message Créé aec succès", "message":serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        # Pour lister tous les messages de la newsletter 
        messages = newsletterMessage.objects.all()
        serializer = NewsletterMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




# ========================================== Admin ==================================

# login Admin
class Adminlogin_view(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is not None:
            if user.is_admin() and user.is_active:
                request.session['user_id'] = user.id  # Stocker l'ID utilisateur dans la session
                self.envoie_mail_de_signal(user.email, user.last_name)
                return Response({"message": "connexion Réussi", "role":"admin", "username": f"{user.last_name}"}, status=status.HTTP_200_OK)
            elif not user.is_active:
                return Response({"error": "Votre compte n'est pas activé."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"error": "Votre compte n'est pas autorisé a se connecter ici."}, status=status.HTTP_403_FORBIDDEN)
        else:
            self.envoie_mail_de_prevention(email)
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
            message = f"Attention!\n\n Quelqu'un tente de se connecter à votre compte OldTopic. Si vous n'y êtes pour rien veuillez Changer de Mot de passe dès maintenant",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



# Ajout d'un Admin par le SuperAdmin
class AjoutAdminView(APIView):
    def post(self, request):
        serializer = AjoutAdminSerializer(data=request.data)

        if serializer.is_valid():
            try:
                superadmin = serializer.save()
                return Response({
                    "message": "SuperAdmin ajouté avec succès.", 
                    "data":{
                        "email": superadmin.user.email,
                        "role": superadmin.user.role,
                        "date_creation": superadmin.date_creation,
                  }

                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": f"Une érreur est survenue: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Admin modifie son Password
class AdminModifieMdpView(APIView):

    def put(self, request):
        user_id = request.session.get('user_id')

        if not user_id:
           return Response({"error":"Utilisateur non identifier."}, status=status.HTTP_401_UNAUTHORIZED)
       

        try:
           user = User.objects.get(id=user_id)
        except User.DoesNotExist:
           return Response({"error": "Cet utilisateur n'existe pas"}, status=status.HTTP_404_NOT_FOUND)
        

        if not user.is_admin():
            return Response({"error": "Vous n'êtes pas un amin"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AdminModifierMdpSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user.last_name = data.get('nom', user.last_name)

            if 'photo' in request.FILES:
                user.photo = request.FILES['photo']
            
            user.save()
            self.envoie_mail_de_signal(user.email, user.last_name)

            return Response({"message":"Vos informations ont été modifié"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def envoie_mail_de_signal(self, email, nom):
        send_mail(
            subject="Modification du mot de passe de votre compte OldTopic",
            message=f"Bonjour Admin {nom}, votre mot de passe a été modifié avec succès."
                    f"\nSi vous n'êtes pas à l'origine de cette modification, veuillez le signaler dès maintenant au SuperAdmin.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



# View pour les mises a jour des infos de l'admin
class AdminUpdateView(APIView): 

    def put(self, request):

        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "Utilisateur non identifié."}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error":"Utilisateur introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_admin():
            return Response({"error":"Vous n'êtes pas un admin"}, status=status.HTTP_400_BAD_REQUEST)
        

        serializer = AdminUpdateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user.last_name = data.get('nom', user.last_name)

            if 'photo' in request.FILES:
                user.photo = request.FILES['photo']

            user.save()
            self.envoie_mail_de_signal(user.email, user.first_name)
            return Response({"message":"Vos informations ont été mise a jour avec"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
    def envoie_mail_de_signal(self, email, nom):
        send_mail(
            subject="Modification des infos de votre compte OldTopic",
            message=f"Bonjour Admin {nom}, les modifications apportées à votre compte OldTopic ont été prises en compte."
                    f"\nSi vous n'êtes pas à l'origine de ces modifications, veuillez le signaler dès maintenant au SuperAdmin.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



# Views pour l'ajout de matricule ====> Pour l'Admin
class AjoutDeMatriculeView(APIView):
    def post(self, request):
        serializer = AjoutDeMatriculeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Matricule ajouté"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Pour la midification de Matricule ====> au niveau de l'admin
class ModifieMatriculeView(APIView):
    def put(self, request, id_mat):
        try:
            pre_enregistrement = PreEnregistrementMatricule.objects.get(id=id_mat)

        except PreEnregistrementMatricule.DoesNotExist:
            return Response({"error": "Matricule introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ModifierMatriculeSerializer(pre_enregistrement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Matricule modifié avec succès.", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Importation de Matricule par fichier Csv ou excel
class ImportMatriculeView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        fichier = request.FILES.get('file')

        if not fichier:
            return Response({"error": "Aucun fichier fourni."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = self.read_fichier(fichier)
        except Exception as e:
            return Response({"error": f"Erreur lors de la lecxture du fichier : {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        created, errors = self.create_matricule(df)
        return Response({
            "message": f"{created} matricule ajoutés",
            "errors": errors
        }, status=status.HTTP_201_CREATED if created else status.HTTP_400_BAD_REQUEST)

    def read_fichier(self, fichier):
        nom_fichier = fichier.name.lower()
        if nom_fichier.endswith('csv'):
            return pd.read_csv(fichier)
        elif nom_fichier.endswith('xlsx') or nom_fichier.endswith('.xls'):
            return pd.read_excel(fichier)
        elif nom_fichier.endswith('pdf'):
            return self.pdf_to_dataframe(fichier)
        else:
            raise Exception("Format de fichier non supporté.")
        
    def pdf_to_dataframe(self, fichier):
        reader = PdfReader(fichier)
        text = ""

        for page in reader.pages:
            text += page.extract_text() + "\n"

        rows = [line.split(',') for line in text.splitlines() if ',' in line]

        return pd.DataFrame(rows, columns=['matricule', 'nom', 'prenom', 'Niveau', 'Filiere'])
    

    def create_matricule(self, df):
        created = 0
        errors = []

        for _, row in df.iterrows():
            try:
                PreEnregistrementMatricule.objects.create(
                    matricule = row[''],
                    nom = row['nom'],
                    prenom = row['prenom'],
                    Niveau = row['Niveau'],
                    Filiere = row['Filiere']
                )
                created += 1
            except Exception as e:
                errors.append(str(e))
        return created, errors


# Liste des Matricule
class ListeMatriculeView(APIView):
    queryset = PreEnregistrementMatricule.objects.all()
    serializers_class = ListeMatriculeSerializer


# Envoi de la newsletter 
class SendNewsletterView(APIView):
    def post(self, request, message_id):
        try:
            message = newsletterMessage.objects.get(id=message_id)
        except newsletterMessage.DoesNotExist:
            return Response({"error":"message introuvable"}, status=status.HTTP_404_NOT_FOUND)
        

        Les_Abonnees = newletter.objects.all()

        for abonnees in Les_Abonnees:
            send_mail(
                subject=message.objet,
                message=message.contenue,
                from_email="agohchris90@gmail.com",
                recipient_list=[abonnees.email],
                fail_silently=False,
            )

        message.sent_at = timezone.now()
        message.save()

        return Response({"message": "Newsletter envoyer"}, status=status.HTTP_200_OK)
    

# Liste des Abonnées a la newsletter
class ListeAdbonneNewsletter(APIView):
    queryset = newletter.objects.all()
    serializer_class = NewsletterListSerializer


# liste des messages de la newsletter
class ListeMessageNiewsLetter(APIView):
    queryset = newsletterMessage.objects.all()
    serializer_class = NewletterMessageListeSerializer



# Liste des Etudiants
class ListeEtudiantView(APIView):
   def get(self, request):
        etudiants = Etudiant.objects.all()
        serializer = ListeEtudiantSerializer(etudiants, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    


# Admin demande une réinitialisation de son mot de passe
class AdminMdpResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({"error": "L'Email est requis."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Aucun utilisateur trouvé"}, status=status.HTTP_404_NOT_FOUND)
        
        # Pour générer maintenant le token ainsi que l'URL

        token = password_reset_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        url_de_reset = request.build_absolute_uri(
            reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
        )
        self.envoie_mail(user.email, user.last_name, url_de_reset)
      
        return Response({"message": "Un lien à été envoyé à votre adresse email."}, status=status.HTTP_200_OK)


    def envoie_mail(self, email, nom, url_reset):
       send_mail(
            subject  = "Reinitialisation de votre mot de passe",
            message=f"Bonjour {nom}, \n\n cliquez sur le lien suivant pour réinitialiser votre mot de passe : \n{url_reset}",
            from_email = "agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False
       )
  

# Admin réinitialise son mot de passe
class AdminMdpResteConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
             return Response({'error': "Lien invalide"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Pour vérifier le token
        if not password_reset_token.check_token(user, token):
            return Response({"error": "Le lien de réinitialisation est invalide ou à expiré"}, status=status.HTTP_400_BAD_REQUEST)
        
        # pour valider et enregistrer le nouveau mot de passe
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not new_password or not confirm_password:
            return Response({"error": "Attention les deux champs sont requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password  != confirm_password:
            return Response({"error": "Les mots de passe ne correspondent pas."}, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(new_password)
        user.save()
        self.envoie_mail_de_confirme(user.email, user.last_name)

        return Response({"message": "Votre mot de passe à été réinitilisé"}, status=status.HTTP_200_OK)

    def envoie_mail_de_confirme(self, email, nom):
        send_mail(
            subject="Mot de passe réinitialisé",
            message=f"Bonjour Admin {nom}, votre mot de passe à été réinitialisé veuillez bien mémorisé vos informations de connexion",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False
        )

# Suspendre un Etudiant
class SuspendreEtudiantView(APIView):
    def put(self, reuqest, etudiant_id):
        try :
            etudiant = Etudiant.objects.get(id=etudiant_id)
            etudiant.user.is_active = False #on désactive l'étudiant
            etudiant.user.save()
            return Response({"message": f"L'étudiant {etudiant.user.first_name} {etudiant.user.last_name} à été suspendu."}, status=status.HTTP_200_OK)
        except Etudiant.DoesNotExist:
            return Response({"error": "Etudiant introuvable"}, status=status.HTTP_404_NOT_FOUND)
        

# Reactiver un Etudiant
class ReactiverEtudiantView(APIView):
    def put(self, reuqest, etudiant_id):
        try :
            etudiant = Etudiant.objects.get(id=etudiant_id)
            etudiant.user.is_active = True #on réactive l'étudiant
            etudiant.user.save()
            return Response({"message": f"L'étudiant {etudiant.user.first_name} {etudiant.user.last_name} à été acrivé."}, status=status.HTTP_200_OK)
        except Etudiant.DoesNotExist:
            return Response({"error": "Etudiant introuvable"}, status=status.HTTP_404_NOT_FOUND)
        

# Ajout de Sujet et corriger
class AjoutSujetCorrigerView(APIView):
    def post(self, request):
        serializer = AjoutSujetCorrigerSerilizer(data=request.data)
        if serializer.is_valid():
            sujet = serializer.save()
            return Response({
                "message": "Sujet ajouté",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Suppression de sujjet
class SupprimerSujetCorrigerView(APIView):
    def delete(self, request, sujet_id):
        try:
            sujet = Sujet.objects.get(id=sujet_id)
            sujet.delete()
            return Response({"message": "Sujet supprimer."}, status=status.HTTP_200_OK)
        except Sujet.DoesNotExist:
            return Response({"error": "Le sujet est introuvable"}, status=status.HTTP_404_NOT_FOUND)

# Modifiaction de sujet 
class ModifierSujetCorrigerView(APIView):
    def put(self, request, sujet_id):
        try:
            sujet = Sujet.objects.get(id=sujet_id)
        except Sujet.DoesNotExist:
            return Response({"error": "Le sujet introuvable."})
        
        serializer = AjoutSujetCorrigerSerilizer(sujet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "le Sujet a été modifier.", 
                             "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Liste de sujet
class ListeSujetView(APIView):
    def get(self, request):
        sujets = Sujet.objects.all()
        serializer = AjoutSujetCorrigerSerilizer(sujets, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


#=========================================== SuperAdmin ==================================

# login SuperAdmin
class SuperAdminlogin_view(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is not None:
            if user.is_superadmin() and user.is_active:
                request.session['user_id'] = user.id
                self.envoie_mail_de_signal(user.email)
                return Response({"message": "Connexion réussie", "role": "superadmin", "email": f"{user.email}"}, status=status.HTTP_200_OK)
            elif not user.is_active:
                return Response({"error": "Votre compte n'est pas activé."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"error": "Votre compte n'est pas autorisé a se connecter ici."}, status=status.HTTP_403_FORBIDDEN)
        else:
            if email:
                self.envoie_mail_de_prevention(email)
            return Response({"error": "Email ou mot de passe incorrecte"}, status=status.HTTP_401_UNAUTHORIZED)
        
    
    def envoie_mail_de_signal(self, email):
        send_mail(
            subject="Tentative de connexion à OldTopic",
            message = f"Bonjour SuperAdmin, Vous avez tenter de vous connecter a votre compte OldTopic. \nSi vous n'y êtes pour rien veuillez le signaler dès maintenant au SuperAdmin \nou Changer de Mot de passe.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )  


    def envoie_mail_de_prevention(self, email):
        send_mail(
            subject="Tentative de connexion à OldTopic",
            message = f"Attention!\n\n Quelqu'un tente de se connecter à votre compte OldTopic. Si vous n'y êtes pour rien veuillez Changer de Mot de passe dès maintenant",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )


# Ajout d'un superAdmin
class AjoutSuperAdmin(APIView):
    
    def post(self, request):
        serializer = AjoutSuperAdminSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "SuperAdmin ajouté"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        






#============================== Gestion des Sujets & Corrigés ==========================




