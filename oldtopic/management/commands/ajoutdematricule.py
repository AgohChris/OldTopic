from django.core.management.base import BaseCommand
from oldtopic.models import PreEnregistrementMatricule

class Command(BaseCommand):
    help = "Ajoute des matricules préenregistrés"

    def handle(self, *args, **kwargs):
        matricules = ['AGOC1507050001', 'DABOA2805010002', 'AGOC1505030001']
        for matricule in matricules:
            PreEnregistrementMatricule.objects.get_or_create(matricule=matricule)
        self.stdout.write(self.style.SUCCESS("Matricules ajoutés avec succès."))