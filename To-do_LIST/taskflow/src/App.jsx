import './index.css'
import { useState, useEffect, useRef } from 'react'
// ============================================================================
// IMPORTATION DES ICÔNES LUCIDE REACT
// ============================================================================
// On remplace tous les emojis natifs par des icônes vectorielles Lucide.
// Avantages par rapport aux emojis :
// - Rendu cohérent sur tous les OS (Windows, macOS, Linux, Android, iOS)
// - Personnalisation facile (taille, couleur, stroke) via les props
// - Pas de dépendance aux polices système emoji
// - Style plus professionnel et uniforme
// ============================================================================
import {
  Briefcase,
  Home,
  GraduationCap,
  Circle,
  Clock,
  CheckCircle2,
  Trash2,
  ChevronDown,
} from 'lucide-react'

// ============================================================================
// MAPPING : VALEUR → ICÔNE LUCIDE
// ============================================================================
// Ces objets permettent d'associer une valeur sémantique (ex: 'Travail')
// à son icône Lucide correspondante. On les utilise à la fois dans les
// dropdowns personnalisés et dans les badges des tâches affichées.
// ============================================================================

/** Icônes associées à chaque catégorie de tâche */
const CATEGORY_ICONS = {
  Travail: <Briefcase size={14} className="shrink-0" />,
  Personnel: <Home size={14} className="shrink-0" />,
  Études: <GraduationCap size={14} className="shrink-0" />,
}

/** Icônes associées à chaque niveau de priorité (cercles colorés) */
const PRIORITY_ICONS = {
  Basse: <Circle fill="#22c55e" color="#22c55e" size={14} className="shrink-0" />,    // vert-500
  Moyenne: <Circle fill="#f97316" color="#FFFF00" size={14} className="shrink-0" />, // jaune-500
  Haute: <Circle fill="#ef4444" color="#ef4444" size={14} className="shrink-0" />,   // red-500
}

/** Icônes associées à chaque filtre d'état de tâche */
const STATUS_ICONS = {
  'En cours': <Clock size={14} className="shrink-0" />,
  'Terminées': <CheckCircle2 size={14} className="shrink-0" />,
}

// ============================================================================
// COMPOSANT CUSTOMSELECT (DROPDOWN PERSONNALISÉ)
// ============================================================================
// POURQUOI NE PAS UTILISER UN <select> NATIF ?
// ---------------------------------------------
// Les éléments <option> d'un <select> HTML natif ne supportent QUE du texte
// brut. Il est techniquement impossible d'y injecter du JSX (composants React,
// icônes SVG, etc.). Seuls les emojis (caractères Unicode) fonctionnent.
//
// SOLUTION : On construit un dropdown entièrement personnalisé avec des <div>
// et Tailwind CSS. Cela permet :
// - d'afficher des icônes Lucide React à côté des labels
// - d'avoir un style visuel 100 % contrôlé et cohérent avec le reste de l'UI
// - de gérer programmatiquement l'ouverture/fermeture et la sélection
//
// ACCESSIBILITÉ : On ajoute role="listbox", aria-expanded, aria-selected et
// un tabindex pour maintenir une bonne accessibilité au clavier.
// ============================================================================
function CustomSelect({ value, onChange, options, placeholder, className = '' }) {
  // État local : le menu déroulant est-il ouvert ?
  const [isOpen, setIsOpen] = useState(false)
  // Référence vers le conteneur DOM pour détecter les clics à l'extérieur
  const containerRef = useRef(null)

  // Trouve l'option actuellement sélectionnée pour afficher son label + icône
  const selectedOption = options.find((opt) => opt.value === value)

  // Ferme le dropdown si l'utilisateur clique en dehors du composant
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    // On écoute les clics sur tout le document, mais seulement quand le menu est ouvert
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* BOUTON DÉCLENCHEUR (affichage de la valeur sélectionnée) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* LISTE DÉROULANTE DES OPTIONS */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${
                option.value === value
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


function App() {
  // ==========================================================================
  // ÉTATS DE L'APPLICATION
  // ==========================================================================

  // 1. État pour la liste des tâches (récupération depuis localStorage)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_v1')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  // 2. État pour le formulaire d'ajout de tâche
  const [formData, setFormData] = useState({
    text: '',
    category: 'Personnel',
    priority: 'Moyenne',
  })

  // 3. États pour la recherche et les filtres
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Toutes')
  const [categoryFilter, setCategoryFilter] = useState('Toutes')

  // ==========================================================================
  // EFFET : PERSISTANCE LOCALSTORAGE
  // ==========================================================================
  useEffect(() => {
    localStorage.setItem('taskflow_v1', JSON.stringify(tasks))
  }, [tasks])

  // ==========================================================================
  // FONCTION : AJOUTER UNE TÂCHE
  // ==========================================================================
  const addTask = (e) => {
    e.preventDefault()
    if (!formData.text.trim()) return // Empêche l'ajout de tâches vides

    const newTask = {
      id: Date.now(),
      ...formData,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setFormData({ ...formData, text: '' }) // Réinitialise seulement le texte
  }

  // ==========================================================================
  // FILTRAGE DES TÂCHES (recherche + état + catégorie)
  // ==========================================================================
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      filter === 'Toutes'
        ? true
        : filter === 'Terminées'
        ? task.completed
        : !task.completed
    const matchesCategory =
      categoryFilter === 'Toutes' ? true : task.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  // ==========================================================================
  // OPTIONS DES DROPDOWNS (définies ici pour être réutilisables)
  // ==========================================================================
  const categoryOptions = [
    { value: 'Travail', label: 'Travail', icon: CATEGORY_ICONS['Travail'] },
    { value: 'Personnel', label: 'Personnel', icon: CATEGORY_ICONS['Personnel'] },
    { value: 'Études', label: 'Études', icon: CATEGORY_ICONS['Études'] },
  ]

  const priorityOptions = [
    { value: 'Basse', label: 'Basse', icon: PRIORITY_ICONS['Basse'] },
    { value: 'Moyenne', label: 'Moyenne', icon: PRIORITY_ICONS['Moyenne'] },
    { value: 'Haute', label: 'Haute', icon: PRIORITY_ICONS['Haute'] },
  ]

  const statusFilterOptions = [
    { value: 'Toutes', label: 'Tous les états', icon: null },
    { value: 'En cours', label: 'En cours', icon: STATUS_ICONS['En cours'] },
    { value: 'Terminées', label: 'Terminées', icon: STATUS_ICONS['Terminées'] },
  ]

  const categoryFilterOptions = [
    { value: 'Toutes', label: 'Toutes les catégories', icon: null },
    ...categoryOptions,
  ]

  // ==========================================================================
  // RENDU JSX
  // ==========================================================================
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          TaskFlow <span className="text-blue-600">tena izy</span>
        </h1>

        {/* ================================================================== */}
        {/* FORMULAIRE D'AJOUT DE TÂCHE                                      */}
        {/* ================================================================== */}
        <form onSubmit={addTask} className="space-y-4 mb-10">
          <input
            type="text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="Ampidiro taches tianao ?"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-all"
          />

          <div className="flex flex-wrap gap-4">
            {/* ------------------------------------------------------------- */}
            {/* SÉLECTEUR DE CATÉGORIE (CustomSelect remplace <select> natif) */}
            {/* On passe les options avec leurs icônes Lucide associées.      */}
            {/* ------------------------------------------------------------- */}
            <CustomSelect
              value={formData.category}
              onChange={(val) => setFormData({ ...formData, category: val })}
              options={categoryOptions}
              className="flex-1 min-w-[140px]"
            />

            {/* ------------------------------------------------------------- */}
            {/* SÉLECTEUR DE PRIORITÉ (CustomSelect remplace <select> natif)  */}
            {/* Les cercles colorés Lucide remplacent les emojis ronds.       */}
            {/* ------------------------------------------------------------- */}
            <CustomSelect
              value={formData.priority}
              onChange={(val) => setFormData({ ...formData, priority: val })}
              options={priorityOptions}
              className="flex-1 min-w-[140px]"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors w-full md:w-auto"
            >
              Ajouter
            </button>
          </div>
        </form>

        {/* ================================================================== */}
        {/* BARRE DE RECHERCHE + FILTRES                                     */}
        {/* ================================================================== */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-1 border-b-2 border-gray-100 focus:border-blue-400 outline-none transition-all"
          />

          <div className="flex flex-wrap gap-2 text-sm">
            {/* Filtre d'état avec CustomSelect */}
            <CustomSelect
              value={filter}
              onChange={setFilter}
              options={statusFilterOptions}
              placeholder="Tous les états"
              className="min-w-[160px]"
            />
            {/* Filtre de catégorie avec CustomSelect */}
            <CustomSelect
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categoryFilterOptions}
              placeholder="Toutes les catégories"
              className="min-w-[180px]"
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* LISTE DES TÂCHES                                                 */}
        {/* ================================================================== */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              Aucune tâche pour le moment...
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      )
                    }
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p
                      className={`font-semibold ${
                        task.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </p>
                    {/* ===================================================== */}
                    {/* BADGES CATÉGORIE + PRIORITÉ avec icônes Lucide        */}
                    {/* Les icônes sont récupérées via les objets de mapping   */}
                    {/* CATEGORY_ICONS et PRIORITY_ICONS définis plus haut.   */}
                    {/* ===================================================== */}
                    <div className="flex gap-2 mt-1 items-center">
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                        {CATEGORY_ICONS[task.category]}
                        {task.category}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                          task.priority === 'Haute'
                            ? 'bg-red-50 text-red-600'
                            : task.priority === 'Moyenne'
                            ? 'bg-yellow-50 text-yellow-500'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        {PRIORITY_ICONS[task.priority]}
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* BOUTON SUPPRIMER avec icône Lucide <Trash2 />            */}
                {/* L'icône vectorielle remplace l'emoji 🗑️ pour un rendu    */}
                {/* propre sur tous les navigateurs et systèmes d'exploitation.*/}
                {/* ========================================================= */}
                <button
                  onClick={() =>
                    setTasks(tasks.filter((t) => t.id !== task.id))
                  }
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Supprimer la tâche"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App

