from django.urls import path
from .views import *

urlpatterns = [
    # Page d'accueil
    path('', home, name='home'),

    # Authentification & Gestion des Comptes
    # path('auth/login', login_view, name='login'),
    # path('auth/register', register_view, name='register'),
    # path('auth/admin/register', admin_register_view, name='admin_register'),
    # path('auth/password/reset-request', reset_request_view, name='reset_request'),
    # path('auth/password/reset-confirm', reset_confirm_view, name='reset_confirm'),
    # path('auth/password/change', password_change_view, name='password_change'),
    # path('auth/profile', auth_profile_view, name='profile'),
    # path('auth/profile/update', auth_profile_update_view, name='profile_update'),

    # Gestion des Sujets & Corrigés
    # path('subjects', SujetListView.as_view(), name='sujet_list'),
    # path('subjects/<int:id>', SujetDetailView.as_view(), name='sujet_detail'),
    # path('subjects/<int:id>/download', sujet_download_view, name='sujet_download'),
    # path('subjects/<int:id>/view', sujet_view_view, name='sujet_view'),

    # Statistiques & Historique
    # path('stats', stats_view, name='stats'),
    # path('history', history_view, name='history'),
    # path('history/student/<int:id>', student_history_view, name='student_history'),

    # Gestion des Étudiants
    # path('students', student_list_view, name='student_list'),
    # path('students/<int:id>', student_detail_view, name='student_detail'),
    # path('students/<int:id>/suspend', student_suspend_view, name='student_suspend'),
    # path('students/<int:id>/reactivate', student_reactivate_view, name='student_reactivate'),

    # Gestion des Administrateurs
    # path('admins', admin_list_view, name='admin_list'),
    # path('admins/<int:id>/suspend', admin_suspend_view, name='admin_suspend'),
    # path('admins/<int:id>/reactivate', admin_reactivate_view, name='admin_reactivate'),

    # Gestion des Matières & Filières
    # path('subjects/matieres', matieres_list_view, name='matieres_list'),
    # path('subjects/filieres', filieres_list_view, name='filieres_list'),
    # path('subjects/matieres/add', matieres_add_view, name='matieres_add'),
    # path('subjects/filieres/add', filieres_add_view, name='filieres_add'),
]