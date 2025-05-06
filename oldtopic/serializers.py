from rest_framework import serializers
from .models import *
from .utils import generation_mdp, genererCodeVerif, genererCodeReinitilisation
from django.core.mail import send_mail



class UserSerializer(serializers.ModelSerializer): 
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']




class EtudiantRegistrationSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(write_only=True)
    prenom = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    matricule = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})


    class Meta:
        model = Etudiant
        fields = ['nom', 'prenom', 'email', 'matricule', 'password', 'password2']


    def validate_matricule(self, value):
        if not PreEnregistrementMatricule.objects.filter(matricule=value).exists():
            raise serializers.ValidationError("Ce matricule n'est pas Autorisé")
        return value
    

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "les mots de passe ne correspondent pas."})
    
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Cet email est déja utilisé"})

        

        return data


    def create(self, validated_data):

        # Suppression des champs unitil dans la table User comme Matricule par exemple

        nom = validated_data.pop('nom')
        prenom = validated_data.pop('prenom')
        email = validated_data.pop('email')
        matricule = validated_data.pop('matricule')
        password = validated_data.pop('password')


        verification_code = genererCodeVerif()

        # Creation de l'utilisateur 
        user = User.objects.create_user(
            username = email,
            email=email,
            password = password,
            first_name = prenom,
            last_name = nom,
            role = 'etudiant',
            is_active=False,
            verification_code = verification_code
        )

        # creation du profile etudiant 

        etudiant = Etudiant.objects.create(user=user, matricule=matricule)
        
        PreEnregistrementMatricule.objects.filter(matricule=matricule).delete()

        self.envoie_du_code_verif(email, verification_code, nom)

        return etudiant
    

    def envoie_du_code_verif(self, email, verification_code, nom):
        send_mail(
            subject="Code de Vérification - OldTopic",
            message = f"Bonjour {nom}, Votre code vérification est le suivant : \n{verification_code} \nveuillez le sisir pour activer votre compte.",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



class AjoutAdminSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    nom = serializers.CharField(write_only=True)

    class Meta:
        model = Admin
        fields = ['email', 'nom']

    def create(self, validated_data):
        email = validated_data['email']
        nom = validated_data['nom']

        password = generation_mdp()

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            last_name=nom,
            role='admin',
            is_active=True
        )

        admin = Admin.objects.create(user=user)
        self.envoie_mail(email, nom, password)

        return admin
    
    def envoie_mail(self, email, nom, password):
        send_mail(
            subject = "Infornation de Connexion a votre compte OldTopic",
            message=f"Bonjour {nom}, \n\n Votre compte Admin à été créé.\n\n Voici vos infos :"
                    f" \n\n Email: {email}\n Mot de passe : {password} ne les partager à personne.",
            from_email = "agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )
    


class  mdpResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet Utilisateur n'existe pas.")
        return value
    
    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)


        # on génre le code de reinitialisation pour l'enregistrer dans la BD avant de l'envoyer par email 
        reset_code = genererCodeReinitilisation()
        user.verification_code = reset_code
        user.save()

        self.envoie_du_code_de_reset_par_mail(user.email, reset_code, user.last_name)

    
    def envoie_du_code_de_reset_par_mail(self, email, code, nom):
        send_mail(
            subject="Votre Code de Réinitialisation",
            message=f"Bonjour {nom}, \n\n Votre code de réinitialisation est {code}" 
                    " \n\n Saisissez le pour réinitialiser votre mot de passe",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )




class verifCodeReinitialisationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)

    def validate_code(self, value):
        if not User.objects.filter(verification_code=value).exists():
            raise serializers.ValidationError("Code de réinitalisation invalide.")
        return value
    def save(self):
        code = self.validated_data['code']
        user = User.objects.get(verification_code=code)
        return user 



class NouveauMotDePasseSerializer(serializers.Serializer):
    nouveau_mdp = serializers.CharField(write_only=True, style={'input_type': 'password'})
    confirm_nouveau_mdp = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        # Vérifie si les mots de passe correspondent
        if data['nouveau_mdp'] != data['confirm_nouveau_mdp']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return data

    def save(self, user):
        # Met à jour le mot de passe de l'utilisateur
        nouveau_mdp = self.validated_data['nouveau_mdp']
        user.set_password(nouveau_mdp)
        user.verification_code = None  # Supprime le code après réinitialisation
        user.save()

        self.envoie_mail_de_signal_succes(user.email, user.last_name)


    def envoie_mail_de_signal_succes(self, email, nom):

        send_mail(
            subject="Mot de passse réinitaliser",
            message=f"Bonjour {nom}, \n\n Votre mot de passe à été reinitialiser avec succès",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



class NewsLetterEmailSendSerializer(serializers.ModelSerializer):


    class Meta:
        model = newletter
        fields = ['email']


    def validate_email(self, value):
        if newletter.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déja inscrit a la Newletter")
        return value
    

    def create(self, validated_data):
        email = validated_data['email']
        instance = super().create(validated_data)
    
        self.send_confirmation_email(email)
        return instance


    def send_confirmation_email(self, email):

        send_mail(
            subject="Confirmation d'inscription à la newsletter",
            message="Merci de vous être inscrit à notre newsletter !",
            from_email="agohchris90@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )



class NewsletterMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = newsletterMessage
        fields = ['id', 'objet', 'contenue', 'created_at', 'sent_at']
        read_only_fields = ['created_at', 'sent_at']