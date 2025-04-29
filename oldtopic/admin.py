from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Etudiant)
admin.site.register(Admin)
admin.site.register(SuperAdmin)
admin.site.register(Stats)
admin.site.register(Suspendre)
admin.site.register(Gerer)
admin.site.register(Telecharger)
admin.site.register(Visualiser)
admin.site.register(Sujet)
admin.site.register(Historique)

