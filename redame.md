# nom de l'ennvironnement virtuel : log

## execute le ficvhier envi.py :
```
puis entre comment nommer ton environnement virtuel : entre log ou un autre nom que tu veux
```

```
puis laisse le  travail s'efectuer
```


# Active l'environnement virtuel

```
source nom_de_environnement/bin/activate
```











## 📑 *Analyse des besoin : Plateforme de Gestion des Anciens Sujets Universitaires à l’UTA*

---

### *1. PRÉSENTATION DU PROJET*
- * Nom du projet : * Plateforme de gestion des anciens sujets universitaires à l’UTA  
- *Technologies :* React Vite, Django, Django REST Framework, PostgreSQL  
- *Responsables :*
  - Chef de projet / Responsable technique : Dabo Ali  
  - Conception : Dabo Ali & AGOH CHRIS  
  - Développeur Back-end : AGOH CHRIS  
  - Développeur Front-end : Dabo Ali  
  - Responsable UI/UX : Dabo Ali & AGOH CHRIS  

- *Objectif :*  
Créer une plateforme web sécurisée permettant aux étudiants d’accéder aux anciens sujets d’examens et corrigés via un espace personnel, et aux administrateurs d’ajouter et gérer ces ressources.

---

### *2. OBJECTIFS*
- Faciliter l’accès aux anciens sujets et corrigés pour les étudiants.
- Centraliser et structurer les ressources pédagogiques de l’université.
- Fournir un espace administrateur pour gérer les contenus, les utilisateurs et les statistiques.
- Offrir un système sécurisé d’authentification avec gestion des rôles.

---

### *3. PARTIES PRENANTES*
- *Étudiants*
- *Administrateurs*
- *Équipe Technique* : Dabo Ali & AGOH CHRIS
- *Université UTA*

---

### *4. BESOINS FONCTIONNELS*
- Authentification et inscription avec email universitaire.
- Espace personnel étudiant avec téléchargement et historique.
- Espace administrateur avec gestion des sujets, étudiants et statistiques.
- Recherche avancée des sujets.
- Notifications et FAQ.

---

### *5. BESOINS NON FONCTIONNELS*
- Sécurité (authentification JWT, contrôle des accès).
- Performance (rapidité d’accès aux sujets et téléchargements).
- Scalabilité (prévoir l’ajout de nouvelles filières/matières).
- Interface responsive et ergonomique.

---

### *6. CAS D’UTILISATION PRINCIPAUX*
- *Étudiant* : Consulter, télécharger sujets et corrigés.
- *Admin* : Ajouter, modifier, supprimer des sujets. Gérer les étudiants. Consulter les statistiques.
- *Étudiant/Admin* : Modifier leur profil, changer leur mot de passe.
- *Recherche* : Par matière, année, semestre, enseignant.

---

### *7. CONTRAINTES TECHNIQUES*
- Framework front : *React Vite*
- Framework back : *Django REST Framework*
- Base de données : *PostgreSQL*
- Hébergement cloud : railway, Netlify
- Système de token sécurisé pour l’authentification (JWT)