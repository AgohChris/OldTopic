from django.urls import path
from .views import *

urlpatterns = [
    # Page d'accueil
    path('', home, name='home'),

    # Authentification & Gestion des Comptes
    path('auth/login/etudiant/', Etudiantlogin_view.as_view(), name='login_student'),
    path('auth/register/etudiant/', EtudiantRegistrationView.as_view(), name='register_student'),
    path('auth/verif_code/', VerifierCodeView.as_view(), name='verif_code'),
    path('auth/login/admin/', Adminlogin_view.as_view(), name='login_admin'),
    path('auth/ajout_admin/', AjoutAdminView.as_view(), name='ajout_admin'),
    path('auth/admin/update/profile', AdminUpdateView.as_view(), name='update_admin_profile'),
]