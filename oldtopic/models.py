from datetime import timezone

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    ROLES = (
        ('admin', 'Admin'),
        ('etudiant', 'Etudiant'),
        ('superadmin', 'SuperAdmin'),
    )
    role = models.CharField(max_length=20, choices=ROLES)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    etat = models.CharField(max_length=20, default='inactif')

    def __str__(self):
        return f'{self.nom} {self.prenom}'


class Etudiant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    matricule = models.CharField(max_length=30, unique=True)

    def rechercher_sujet(self, matiere):
        return Sujet.objects.filter(matiere=matiere)
    def telecharger_sujet(self, sujet_id):
        sujet = Sujet.objects.get(id=sujet_id)
        Telecharger.objects.create(etudiant=self, sujet=sujet, DateTelechargement=timezone.now())
        sujet.nb_telechargement += 1
        sujet.save()

    def voir_historique(self):
        return Telecharger.objects.filter(etudiant=self)



    def __str__(self):
        return self.matricule


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    post = models.CharField(max_length=30)


    def modifier_sujet(self, sujet_id, new_donnees):
        sujet = Sujet.objects.get(id=sujet_id)
        for key, value in new_donnees.items():
            setattr(sujet, key, value)
        sujet.save()


    def ajouter_sujet(self, sujet):
        sujet.save()

    def supprimer_sujet(self, sujet_id):
        sujet = Sujet.objects.get(id=sujet_id)
        sujet.delete()

    def suspendre_etudiant(self, etudiant_id, motif):
        Suspendre.objects.create(user_id=etudiant_id,
                                 admin=self.user,
                                 DateSuspension=timezone.now(),
                                 Motif = motif
                                 )

    def voir_statistiques(self):
        return Stats.objects.all()

    def __str__(self):
        return self.post


class SuperAdmin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.user.matricule


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
    type = models.CharField(max_length=60)
    annee = models.CharField(max_length=60)
    auteur = models.CharField(max_length=60)
    Sujet_url = models.FileField(upload_to='sujets/')
    Corriger_url = models.FileField(upload_to='corriges/')
    date_upload = models.DateTimeField(auto_now=True)
    nb_telechargement = models.IntegerField()


class Historique(models.Model):
    date_consultation = models.DateTimeField(auto_now=True)
    action = models.CharField(max_length=30)