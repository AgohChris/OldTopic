from rest_framework import serializers
from .models import *
from .utils import generation_mdp
from django.core.mail import send_mail



class UserSerializer(serializers.ModelSerializer): 
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']



class AdminRegistrationSerializer(serializers.ModelSerializer):

    
    nom = serializers.CharField(write_only=True)
    prenom = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    matricule = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Admin
        fields = ['nom', 'prenom', 'email', 'password', 'password2']


    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "les mots de passe ne correspondent pas."})
        return data

    def create(self, validated_data):
        # Suppression des champs unitil dans la table User comme Matricule par exemple

        nom = validated_data.pop('nom')
        prenom = validated_data.pop('prenom')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        # Creation de l'utilisateur

        user = User.objects.create_user(
            username = email,
            email=email,
            password = password,
            first_name = prenom,
            last_name = nom,
            role = 'admin'
        )

        # creation du profile etudiant

        admin = Admin.objects.create(user=user)

        return admin
    


    

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


    def validation_matricule(self, value):
        if not PreEnregistrementMatricule.objects.filter(matricule=value).exists():
            raise serializers.ValidationError("Ce matricule n'est pas Autorisé")
        return value
    

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "les mots de passe ne correspondent pas."})
        return data


    def create(self, validated_data):

        # Suppression des champs unitil dans la table User comme Matricule par exemple

        nom = validated_data.pop('nom')
        prenom = validated_data.pop('prenom')
        email = validated_data.pop('email')
        matricule = validated_data.pop('matricule')
        password = validated_data.pop('password')

        # Creation de l'utilisateur

        user = User.objects.create_user(
            username = email,
            email=email,
            password = password,
            first_name = prenom,
            last_name = nom,
            role = 'etudiant'
        )

        # creation du profile etudiant 

        etudiant = Etudiant.objects.create(user=user, matricule=matricule)
        
        PreEnregistrementMatricule.objects.filter(matricule=matricule).delete()

        return etudiant



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
            role='admin'
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
    



        


class SuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperAdmin
        fields = "__all__"
       

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = "__all__"
     

class SuspendreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suspendre
        fields = "__all__"
        

class GererSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gerer
        fields = "__all__"


class TelechargerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telecharger
        fields = "__all__"
        

class VisualiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visualiser
        fields = "__all__"


class  SujetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sujet
        fields = "__all__"
       

class  HistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historique
        fields = "__all__"
       