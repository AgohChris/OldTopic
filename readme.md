# Liste des API's de OldTopic

## 📑 Endpoints API  

### 🔐 Authentification & Gestion des Comptes
| Méthode | Endpoint                       | Description                          |
|:--------|:-------------------------------|:-------------------------------------|
| POST    | /auth/login                    | Connexion utilisateur                |
| POST    | /auth/register                 | Inscription étudiant avec vérification par email |
| POST    | /auth/admin/register           | Ajouter un admin (SuperAdmin) avec vérification par email |
| POST    | /auth/password/reset-request   | Demande de réinitialisation avec envoi de code sécurisé |
| POST    | /auth/password/reset-confirm   | Confirmation du nouveau mot de passe avec code chiffré |
| PUT     | /auth/password/change          | Changement de mot de passe           |
| GET     | /auth/profile                  | Récupérer son profil                 |
| PUT     | /auth/profile/update           | Modifier son profil                  |

---

### 📂 Gestion des Sujets & Corrigés
| Méthode | Endpoint                         | Description                          |
|:--------|:---------------------------------|:-------------------------------------|
| GET     | /subjects                       | Liste des sujets avec filtres        |
| GET     | /subjects/{id}                  | Détails d’un sujet                   |
| POST    | /subjects                       | Ajouter un sujet (Admin)             |
| PUT     | /subjects/{id}                  | Modifier un sujet (Admin)            |
| DELETE  | /subjects/{id}                  | Supprimer un sujet (Admin)           |
| GET     | /subjects/{id}/download         | Télécharger un sujet                 |
| GET     | /subjects/{id}/view             | Consulter un sujet en ligne          |

---

### 📊 Statistiques & Historique
| Méthode | Endpoint                         | Description                          |
|:--------|:---------------------------------|:-------------------------------------|
| GET     | /stats                          | Statistiques globales (Admin/SuperAdmin) |
| GET     | /history                        | Historique personnel de téléchargements |
| GET     | /history/student/{id}           | Historique d’un étudiant (Admin)     |

---

### 👥 Gestion des Étudiants
| Méthode | Endpoint                         | Description                          |
|:--------|:---------------------------------|:-------------------------------------|
| GET     | /students                       | Liste des étudiants (Admin)          |
| GET     | /students/{id}                  | Détails étudiant                     |
| PUT     | /students/{id}/suspend          | Suspendre un étudiant                |
| PUT     | /students/{id}/reactivate       | Réactiver un étudiant                |

---

### 👥 Gestion des Administrateurs
| Méthode | Endpoint                         | Description                          |
|:--------|:---------------------------------|:-------------------------------------|
| GET     | /admins                         | Liste des administrateurs (SuperAdmin) |
| POST    | /admins                         | Ajouter un administrateur            |
| PUT     | /admins/{id}/suspend            | Suspendre un administrateur          |
| PUT     | /admins/{id}/reactivate         | Réactiver un administrateur          |

---

### 📑 Gestion des Matières & Filières
| Méthode | Endpoint                         | Description                          |
|:--------|:---------------------------------|:-------------------------------------|
| GET     | /subjects/matieres              | Liste des matières                   |
| POST    | /subjects/matieres              | Ajouter une matière (Admin)          |
| GET     | /subjects/filieres              | Liste des filières                   |
| POST    | /subjects/filieres              | Ajouter une filière (Admin)          |

---

## 📌 Notes techniques
- **Authentification** : Basée sur un **Système d'Authentification complet (SA)** :
  - Vérification par email avec envoi de codes sécurisés.
  - Gestion des sessions sécurisées (pas de JWT).
  - Chiffrement des données sensibles.
- **Permissions** : DRF personnalisées par rôle.
- **Stockage des fichiers** : Sécurisé sur le serveur Railway.
- **Upload** : Via formulaire multipart avec validation du type et de la taille.

---

## 📈 Roadmap (Back)
- [ ] Authentification / SA avec vérification par email
- [ ] Gestion utilisateurs
- [ ] API sujets & téléchargements
- [ ] Historique
- [ ] Statistiques
- [ ] Notifications par email (password reset / suspension)
- [ ] Export CSV des stats (optionnel)

---



# path('auth/admin/login', admin_login_view, name='admin_login'),
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