# Installation de TaskFlow

Ce guide explique comment installer et lancer le projet **TaskFlow** en local.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (installé automatiquement avec Node.js)

Vérifiez vos versions :

```bash
node -v
npm -v
```

---

## Étapes d'installation

### 1. Cloner le dépôt (si ce n'est pas déjà fait)

```bash
git clone <url-du-repo>
cd To-do_LIST/taskflow
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande installe toutes les dépendances listées dans le `package.json`, notamment :
- React & React DOM
- Vite
- Tailwind CSS
- ESLint
- **Lucide React** (icônes vectorielles remplaçant les emojis natifs)

### 3. Lancer le serveur de développement

```bash
npm run dev
```

### 4. Ouvrir l'application dans le navigateur

Rendez-vous sur l'URL indiquée dans le terminal :

```
http://localhost:5173
```

---

## Scripts disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| Démarrer le dev | `npm run dev` | Lance le serveur de développement Vite avec Hot Module Replacement (HMR) |
| Build | `npm run build` | Compile l'application pour la production (dossier `dist/`) |
| Preview | `npm run preview` | Prévisualise la version de production en local |
| Lint | `npm run lint` | Analyse le code avec ESLint pour détecter les erreurs |

---

## Résolution des problèmes courants

### Erreur "Cannot find module"

Supprimez le dossier `node_modules` et le fichier `package-lock.json`, puis réinstallez :

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port déjà utilisé

Si le port `5173` est déjà utilisé, Vite vous proposera automatiquement un autre port (ex: `5174`).

Vous pouvez aussi spécifier un port manuellement :

```bash
npm run dev -- --port 3000
```

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
└── INSTALL.md           # Ce fichier
```

---

## Notes

- L'application utilise le `localStorage` du navigateur pour sauvegarder les tâches. Aucune base de données externe n'est requise.
- Le projet est configuré avec **Tailwind CSS v4** et utilise le plugin `@tailwindcss/vite`.
- **Remplacement des emojis par Lucide React** : Les émojis natifs (💼, 🏠, 🎓, 🟢, 🟡, 🔴, ⏳, ✅, 🗑️) ont été remplacés par des icônes vectorielles Lucide pour un rendu cohérent sur tous les OS. Les `<select>` natifs ont été remplacés par un composant `CustomSelect` personnalisé car les `<option>` HTML ne supportent pas les composants React.

---

## Besoin d'aide ?

Consultez le fichier [`readmev1.md`](./readmev1.md) pour plus de détails sur les fonctionnalités et la stack technique.

