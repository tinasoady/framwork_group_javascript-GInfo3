# TaskFlow

Une application moderne de gestion de tâches (To-Do List) construite avec **React**, **Vite** et **Tailwind CSS**. TaskFlow vous permet d'organiser votre quotidien en ajoutant, filtrant et suivant vos tâches facilement.

---

## Fonctionnalités

- **Ajout de tâches** : Créez des tâches avec un texte descriptif, une catégorie et un niveau de priorité.
- **Catégories** : Travail (Briefcase), Personnel (Home), Études (GraduationCap)
- **Priorités** : Basse (cercle vert), Moyenne (cercle orange), Haute (cercle rouge)
- **Persistance des données** : Vos tâches sont automatiquement sauvegardées dans le `localStorage` du navigateur.
- **Recherche en temps réel** : Trouvez rapidement une tâche grâce à la barre de recherche.
- **Filtres combinés** :
  - Par état : Toutes, En cours (Clock), Terminées (CheckCircle2)
  - Par catégorie : Toutes les catégories, Travail, Personnel, Études
- **Gestion de l'état** : Cochez une tâche pour la marquer comme terminée.
- **Suppression** : Supprimez une tâche en un clic.
- **Interface responsive** : Design adaptatif et moderne grâce à Tailwind CSS.

---

## Stack Technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| React | ^19.2.4 | Bibliothèque UI |
| React DOM | ^19.2.4 | Rendu DOM |
| Vite | ^8.0.4 | Bundler & serveur de développement |
| Tailwind CSS | ^4.2.2 | Framework CSS utilitaire |
| Lucide React | ^latest | Bibliothèque d'icônes vectorielles |
| ESLint | ^9.39.4 | Linter JavaScript |

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (installé avec Node.js)

---

## Installation

1. **Cloner le dépôt** (si ce n'est pas déjà fait) :
   ```bash
   git clone <url-du-repo>
   cd To-do_LIST/taskflow
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   Rendez-vous sur l'URL indiquée dans le terminal (par défaut : `http://localhost:5173`).

---

## Utilisation

1. **Ajouter une tâche** :
   - Saisissez le texte de votre tâche.
   - Choisissez une **catégorie** et une **priorité**.
   - Cliquez sur le bouton **Ajouter**.

2. **Rechercher / Filtrer** :
   - Utilisez la barre de recherche pour filtrer par texte.
   - Utilisez les menus déroulants pour filtrer par état ou par catégorie.

3. **Gérer vos tâches** :
   - Cochez la case pour marquer une tâche comme terminée.
   - Cliquez sur l'icône Trash2 (Lucide React) pour supprimer une tâche.

> **Note** : Toutes vos tâches sont sauvegardées automatiquement dans votre navigateur (`localStorage`).

---

## Scripts disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| Démarrer le dev | `npm run dev` | Lance le serveur de développement Vite |
| Build | `npm run build` | Compile l'application pour la production |
| Preview | `npm run preview` | Prévisualise la version de production |
| Lint | `npm run lint` | Analyse le code avec ESLint |

---

## Structure du projet

```
taskflow/
├── public/              # Fichiers statiques (favicon, icônes)
├── src/
│   ├── assets/          # Images et ressources
│   ├── App.jsx          # Composant principal (logique & UI)
│   ├── App.css          # Styles spécifiques à App
│   ├── index.css        # Styles globaux / Tailwind
│   └── main.jsx         # Point d'entrée React
├── index.html           # Page HTML principale
├── vite.config.js       # Configuration Vite
├── package.json         # Dépendances & scripts
└── readmev1.md          # Ce fichier
```

---

## Améliorations futures (idées)

- [ ] Édition inline des tâches existantes
- [ ] Drag & drop pour réorganiser les tâches
- [ ] Mode sombre (dark mode)
- [ ] Synchronisation cloud / backend
- [ ] Dates d'échéance et notifications
- [ ] Export / import des tâches (JSON)

---

## Auteur

Projet développé dans le cadre du mini-projet JavaScript / Framework — GInfo3.

Nous 8 etudiants adorables 

---

## Licence

Ce projet est privé et à usage éducatif.

