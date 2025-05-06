from django.core.management.base import BaseCommand
from oldtopic.models import PreEnregistrementMatricule

class Command(BaseCommand):
    help = "Ajout des matricules préenregistrés"

    def handle(self, *args, **kwargs):
        matricules = [
                        {"matricule": "DABA2805010002", "nom": " ", "prenom":" ", "Niveau":" ", "Filiere": " "},
                        {"matricule": "AGOV2307010001", "nom": " ", "prenom":" ", "Niveau":" ", "Filiere": " "},
                        {"matricule": "KOUY2912030006", "nom": " ", "prenom":" ", "Niveau":" ", "Filiere": " "},
                        {"matricule": "ALLN1205030001", "nom": " ", "prenom":" ", "Niveau":" ", "Filiere": " "},
                      ]

        for data in matricules:
            obj, created = PreEnregistrementMatricule.objects.get_or_create(
                matricule = data["matricule"],
                defaults={
                    "nom": data["nom"],
                    "prenom": data["prenom"],
                    "Niveau": data["Niveau"],
                    "Filiere": data["Filiere"],
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"Martricule {data['matricule']} ajouté "))
            else:
                self.stdout.write(self.style.WARNING(f"Martricule {data['matricule']} existe déja "))

        self.stdout.write(self.style.SUCCESS("Tous les champs ont été traités."))