from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Page d'accueil
    path('', home, name='home'),

    #============================= Authentification & Gestion des Comptes===========================

                                        #=======Etudiant==========
    # ======Register
    path('auth/register/etudiant/', EtudiantRegistrationView.as_view(), name='register_student'),
    path('auth/verif_code/', VerifierCodeView.as_view(), name='verif_code'),

    # ======Reinitialisation
    path('auth/password/reset/verification_email/', MdpResetRequestView.as_view(), name='email_verif'),
    path('auth/password/reset/verification_code/', VerifCodeReinitialisationView.as_view(), name='verif_code_reset'),
    path('auth/password/reset/new_password/', NouveauMotDePasseView.as_view(), name='nouv_mdp'),

    # ======Connexion
    path('auth/login/etudiant/', Etudiantlogin_view.as_view(), name='login_student'),

    # ======Modification Du mdp de l'étudiants 
    path('auth/etudiant/update/password/', EtudiantModifieMdpview.as_view(), name='update_student_password'),

                                        #=========Admin==============

    # ======== Inscription et Ajout d'admin
    path('auth/ajout_admin/', AjoutAdminView.as_view(), name='ajout_admin'),

    # ======== Connexion
    path('auth/login/admin/', Adminlogin_view.as_view(), name='login_admin'),

    # ======== Modification des infos 
    path('auth/admin/update/profile/', AdminUpdateView.as_view(), name='update_admin_profile'),
    path('auth/admin/update/password/', AdminModifieMdpView.as_view(), name='update_admin_password'),


                                        #==========Newsletter==========
    path('newsletter/subscribe/', AbonnementNewsletterView.as_view(), name='newletter_subs'),
    path('newsletter/unsubscribe/', DesabonnementNewsletter.as_view(), name='newsletter_unsubs'),
    path('newsletter/message_campagne/', NewsLetterMessageView.as_view(), name='newsletter_campaigns'),
    path('newsletter/message_campagne/<int:message_id>/send/', SendNewsletterView.as_view(), name='send_newsletter'),






    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)