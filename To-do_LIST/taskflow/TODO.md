# Plan de migration : Emojis → Lucide React (Option A - Dropdowns custom)

## Étapes
1. [x] Installer `lucide-react`
2. [x] Modifier `App.jsx` :
   - [x] Importer les icônes Lucide nécessaires
   - [x] Créer un composant `CustomSelect` (dropdown personnalisé avec Tailwind)
   - [x] Remplacer les 5 `<select>` natifs par `CustomSelect`
   - [x] Remplacer 🗑️ par `<Trash2 />`
   - [x] Ajouter les icônes dans les badges de tâches
   - [x] Ajouter des commentaires explicatifs
3. [x] Tester le rendu (build Vite réussi)

## Mapping Emojis → Lucide
| Emoji | Label | Icône Lucide |
|-------|-------|-------------|
| 💼 | Travail | `<Briefcase />` |
| 🏠 | Personnel | `<Home />` |
| 🎓 | Études | `<GraduationCap />` |
| 🟢 | Basse | `<Circle fill="green" color="green" />` |
| 🟡 | Moyenne | `<Circle fill="orange" color="orange" />` |
| 🔴 | Haute | `<Circle fill="red" color="red" />` |
| ⏳ | En cours | `<Clock />` |
| ✅ | Terminées | `<CheckCircle2 />` |
| 🗑️ | Supprimer | `<Trash2 />` |

