from django.utils.timezone import now
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from .utils import *
# Create your models here.



FILIERE_CHOICES = [
    ('IGL', 'IGL'),
    ('RIT', 'RIT'),
    ('DROIT', 'DROIT'),
    ('FBA', 'FBA'),
    ('SEG', 'SEG'),
    ('PFC', 'PFC'),
    ('ACG', 'ACG'),

]

NIVEAU_CHOICES = [
    ('licence_1', 'Licence 1'),
    ('licence_2', 'Licence 2'),
    ('licence_3', 'Licence 3'),
    ('BTS_1',      'BTS 1' ),
    ('BTS_2',      'BTS 2' ),
    ('master_1', 'Master 1'),
    ('master_2', 'Master 2'),
]

TYPE_CHOICES = [
    ('Examen', 'Examen'),
    ('TD', 'Traveaux Dirigés'),
    ('TP', 'Traveaux Pratiques'),
    ('Devoir', 'Devoir'),
    ('Interrogation', 'Interrogation'),
]


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role='etudiant', **extra_fields):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email")
        email = self.normalize_email(email)
        username = username or email.split('@')[0]  # Génère un username par défaut si non fourni
        user = self.model(username=username, email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")
        if extra_fields.get('is_active') is not True:
            raise ValueError("Le superutilisateur doit avoir is_active=True.")

        # Appelle create_user avec un username généré automatiquement si nécessaire
        return self.create_user(username=None, email=email, password=password, role='superadmin', **extra_fields)


class User(AbstractUser):

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = []

    ROLES = (
        ('admin', 'Admin'),
        ('etudiant', 'Etudiant'),
        ('superadmin', 'SuperAdmin'),
    )
    password = models.CharField(max_length=130)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLES, default='etudiant')
    is_active = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, null=True)
    photo = models.ImageField(upload_to=photo_upload_path, blank=True, null=True)
    

    objects = UserManager()  


    def is_admin(self):
        return self.role == 'admin'

    def is_superadmin(self):
        return self.role == 'superadmin'

    def is_etudiant(self):
        return self.role == 'etudiant'

    def __str__(self):
        return f'{self.username} ({self.role})'



class Etudiant(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='etudiant_profile')
    matricule = models.CharField(max_length=15, unique=True)

    
    def __str__(self):
        return f'{self.user.username} - {self.matricule} - {self.user.first_name} - {self.user.last_name}'



class PreEnregistrementMatricule(models.Model):
    matricule = models.CharField(max_length=15, unique=True)
    nom = models.CharField(max_length=60, null=True)
    prenom = models.CharField(max_length=70, null=True)
    Niveau = models.CharField(max_length=30, choices=NIVEAU_CHOICES, null=True)
    Filiere = models.CharField(max_length=100, choices=FILIERE_CHOICES ,null=True)

    def __str__(self):
        return f'{self.matricule} - {self.nom} {self.prenom} - {self.Filiere} - {self.Niveau}'



class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    post = models.CharField(max_length=30)

    def nb_post(self):
        return Sujet.objects.filter(auteur=self.user.username).count()


    def __str__(self):
        
        return f'{self.user.username} - {self.post}'



class SuperAdmin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='superadmin_profile')
    role = models.CharField(max_length=30, default='SuperAdmin')
    permissions = models.TextField(blank=True, null=True)
    date_creation = models.DateTimeField(default=now)
    
    def __str__(self):
        return f'{self.user.username} - {self.role}'
    

    @staticmethod
    def count_superadmins():
        return SuperAdmin.objects.count()




class Stats(models.Model):

    nb_telechargement = models.IntegerField()
    nb_Etudiant = models.IntegerField()
    nb_Sujet_disponible = models.IntegerField()
    taux_adoption = models.FloatField()

    def generer_rapport(self):
        return (f'Rapport: {self.nb_telechargement} téléchargements, '
                f'{self.nb_Etudiant} étudiants, {self.nb_Sujet_disponible} '
                f'sujets disponibles, taux d\'adoption: {self.taux_adoption}%')

    def filtrer_par_matiere(self, matiere):
        return Stats.objects.filter(matiere=matiere)

    def calculer_taux_croissant(self):
        # Placeholder for actual calculation logic
        return self.taux_adoption * 1.1


class Suspendre(models.Model):
    user = models.ForeignKey('Etudiant', on_delete=models.CASCADE)
    admin = models.ForeignKey('Admin', on_delete=models.CASCADE)

    DateSuspension = models.DateTimeField()
    Motif = models.TextField(blank=True)


    # Adding a new method to get the suspension details
    def get_suspension_details(self):
        return f'Suspension Date: {self.DateSuspension}, Motif: {self.Motif}'


class Gerer(models.Model):
    Action = models.CharField(max_length=60)


class Telecharger(models.Model):
    etudiant = models.ForeignKey('Etudiant', on_delete=models.CASCADE)
    sujet = models.ForeignKey('Sujet', on_delete=models.CASCADE)
    DateTelechargement = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.etudiant} a téléchargé {self.sujet} le {self.DateTelechargement}'


class Visualiser(models.Model):
   stats = models.ForeignKey('Stats', on_delete=models.CASCADE)
   admin = models.ForeignKey('Admin', on_delete=models.CASCADE)
   date_visualisation = models.DateTimeField(auto_now=True)
   type_statistique = models.CharField(max_length=60)

   def __str__(self):
       return f'{self.type_statistique} visualisé le {self.date_visualisation}'


class Sujet(models.Model):
    titre = models.CharField()
    description = models.TextField(blank=True)
    matiere = models.CharField(max_length=60)
    type = models.CharField(max_length=60, choices=TYPE_CHOICES) #default='TD'
    filiere = models.CharField(max_length=60, choices=FILIERE_CHOICES, default='IGL')
    niveau = models.CharField(max_length=60, choices=NIVEAU_CHOICES, default='licence_1')
    annee = models.CharField(max_length=60)
    auteur = models.CharField(max_length=60)
    Sujet_url = models.FileField(upload_to=sujet_upload_path)
    Corriger_url = models.FileField(upload_to=corriger_upload_path)
    date_upload = models.DateTimeField(auto_now=True)
    nb_telechargement = models.IntegerField()


class newletter(models.Model):
    email = models.EmailField(unique=True)
    date_inscription = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    
    def __str__(self):
        return f"{self.email} inscrit le {self.date_inscription}"


class newsletterMessage(models.Model):
    objet = models.CharField(max_length=255)
    contenue = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.objet


class Historique(models.Model):
    date_consultation = models.DateTimeField(auto_now=True)
    action = models.CharField(max_length=30)
