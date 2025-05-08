from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Telecharger, Sujet

@receiver(post_save, sender=Telecharger)
def update_nb_telechargement(sender, instance, created, **kwargs):

    if created:
        sujet = instance.sujet
        sujet.nb_telechargement = Telecharger.objects.filter(sujet=sujet).count()
        sujet.save()