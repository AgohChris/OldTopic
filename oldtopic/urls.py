from django.urls import path
from .views import *

urlpatterns = [
    # Page d'accueil
    path('', home, name='home'),

    # Authentification & Gestion des Comptes

    #Inscription et Ajout d'admin
    path('auth/register/etudiant/', EtudiantRegistrationView.as_view(), name='register_student'),
    path('auth/ajout_admin/', AjoutAdminView.as_view(), name='ajout_admin'),
    path('auth/verif_code/', VerifierCodeView.as_view(), name='verif_code'),

    # Réinitalisation du mot de passe
    path('auth/password/reset/verification_email/', MdpResetRequestView.as_view(), name='email_verif'),
    path('auth/password/reset/verification_code/', VerifCodeReinitialisationView.as_view(), name='verif_code_reset'),
    path('auth/password/reset/new_password/', NouveauMotDePasseView.as_view(), name='nouv_mdp'),

    #Connexion
    path('auth/login/etudiant/', Etudiantlogin_view.as_view(), name='login_student'),
    path('auth/login/admin/', Adminlogin_view.as_view(), name='login_admin'),


    #Modification des infos 
    path('auth/admin/update/profile', AdminUpdateView.as_view(), name='update_admin_profile'),
    path('auth/etudiant/update/profile', EtudiantUpdateview.as_view(), name='update_student_profile')
]