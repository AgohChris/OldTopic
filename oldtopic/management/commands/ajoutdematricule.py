from django.core.management.base import BaseCommand
from oldtopic.models import PreEnregistrementMatricule

class Command(BaseCommand):
    help = "Ajoute des matricules préenregistrés"

    def handle(self, *args, **kwargs):
        matricules = ['DABA2805010002', 'AGOV2307010001',
                      'KOUY2912030006', 'ALLN1205030001'
                      ]
        for matricule in matricules:
            PreEnregistrementMatricule.objects.get_or_create(matricule=matricule)
        self.stdout.write(self.style.SUCCESS("Matricules ajoutés avec succès."))