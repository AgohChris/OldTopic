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
- [x] Authentification / SA avec vérification par email
- [x] Gestion utilisateurs
- [x] API sujets & téléchargements
- [x] Historique
- [x] Statistiques
- [ ] Notifications par email (password reset / suspension)
- [ ] Export CSV des stats (optionnel)

---

## 🧑‍💻 Auteurs
- **Agoh Chris** - Backend & API

**Github :**
- [Agoh Chris](https://github.com/AgohChris)

---

## 🚀 Licence
Projet académique réalisé dans le cadre de la Licence 3 Génie Logiciel à l'Université de Technologie d'Abidjan.


