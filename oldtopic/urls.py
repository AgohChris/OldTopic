from django.urls import path
from .views import *

urlpatterns = [
    # Page d'accueil
    path('', home, name='home'),

    # Authentification & Gestion des Comptes
    # path('auth/login', login_view, name='login'),
    path('auth/register/etudiant/', EtudiantRegistrationView.as_view(), name='register_student'),
    path('auth/ajout_admin/', AjoutAdminView.as_view(), name='ajout_admin'),
    path('auth/admin/update/', AdminUpdateView.as_view(), name='update_admin'),

    
]