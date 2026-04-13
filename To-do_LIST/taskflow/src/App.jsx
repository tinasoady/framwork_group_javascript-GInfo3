import './index.css'
import { useState, useEffect } from 'react'


function App() {
  // 1. État pour la liste des tâches
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_v1');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 2. État pour le formulaire (on regroupe tout ici) initialisé avec des valeurs par défaut
  const [formData, setFormData] = useState({
    text: '',
    category: 'Personnel',
    priority: 'Moyenne'
  });


// .mi sauvegarder automatiquement dès que la liste 'tasks' change
useEffect(() => {
  // On transforme le tableau JS en chaîne de caractères JSON pour le stockage
  localStorage.setItem('taskflow_v1', JSON.stringify(tasks));
}, [tasks]); // S'exécute à chaque fois que 'tasks' est modifié


  // Fonction pour ajouter une tâche
  const addTask = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!formData.text.trim()) return;

    const newTask = {
      id: Date.now(),
      ...formData,
      completed: false
    };

    setTasks([...tasks, newTask]);
    
    // Réinitialise seulement le texte après l'ajout
    setFormData({ ...formData, text: '' });
  };

  //resaka recherche et filtres
  const [search, setSearch] = useState('');
const [filter, setFilter] = useState('Toutes'); // 'Toutes', 'En cours', 'Terminées'
const [categoryFilter, setCategoryFilter] = useState('Toutes');

// On applique les filtres et la recherche avant d'afficher les tâches
// On vérifie pour chaque tâche si elle correspond à la recherche, au filtre d'état et au filtre de catégorie
// Si le filtre est "Toutes", on accepte toutes les tâches, sinon on compare avec l'état ou la catégorie de la tâche
// On utilise toLowerCase() pour rendre la recherche insensible à la casse
// Le résultat est un tableau de tâches qui correspondent à tous les critères sélectionnés
// Par exemple, si l'utilisateur a saisi "projet" dans la recherche, sélectionné "En cours" dans le filtre d'état et "Travail" dans le filtre de catégorie, alors seules les tâches qui contiennent "projet" dans leur texte, qui ne sont pas terminées et qui appartiennent à la catégorie "Travail" seront affichées.
// Cela permet à l'utilisateur de trouver rapidement une tâche spécifique parmi une longue liste en combinant plusieurs critères de filtrage.
// On utilise la méthode filter() pour créer un nouveau tableau qui ne contient que les tâches qui passent les conditions définies dans la fonction de rappel. Chaque condition vérifie si la tâche correspond à la recherche, au filtre d'état et au filtre de catégorie. Si une tâche ne correspond pas à l'un des critères, elle sera exclue du tableau final affiché à l'utilisateur.
//Comme ton interface utilise filteredTasks.map, elle se met à jour instantanément pour n'afficher que les tâches qui correspondent.

const filteredTasks = tasks.filter(task => {
  const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
  const matchesStatus = 
    filter === 'Toutes' ? true : 
    filter === 'Terminées' ? task.completed : !task.completed;
  const matchesCategory = 
    categoryFilter === 'Toutes' ? true : task.category === categoryFilter;

  return matchesSearch && matchesStatus && matchesCategory;
});


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          TaskFlow <span className="text-blue-600">tena izy</span>
        </h1>

        {/* Formulaire d'ajout */}
        <form onSubmit={addTask} className="space-y-4 mb-10">
          <input 
            type="text"
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            placeholder="Quelle est la mission ?"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-all"
          />
          
          <div className="flex flex-wrap gap-4">
            {/* Sélecteur de Catégorie */}
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg flex-1"
            >
              <option value="Travail">💼 Travail</option>
              <option value="Personnel">🏠 Personnel</option>
              <option value="Études">🎓 Études</option>
            </select>

            {/* Sélecteur de Priorité */}
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg flex-1"
            >
              <option value="Basse">🟢 Basse</option>
              <option value="Moyenne">🟡 Moyenne</option>
              <option value="Haute">🔴 Haute</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors w-full md:w-auto">
              Ajouter
            </button>
          </div>
        </form>

        <div className="mb-6 space-y-4">
  {/* Barre de recherche */}
  <input 
    type="text"
    placeholder="Rechercher une tâche..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-1 border-b-2 border-gray-100 focus:border-blue-400 outline-none transition-all"
  />

  <div className="flex flex-wrap gap-2 text-sm">
    {/* Filtre d'état */}
    <select 
      value={filter} 
      onChange={(e) => setFilter(e.target.value)}
      className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200 outline-none"
    >
      <option value="Toutes">Tous les états</option>
      <option value="En cours">⏳ En cours</option>
      <option value="Terminées">✅ Terminées</option>
    </select>

    {/* Filtre de catégorie */}
    <select 
      value={categoryFilter} 
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="bg-gray-50 px-3 py-1 rounded-full border border-gray-200 outline-none"
    >
      <option value="Toutes">Toutes les catégories</option>
      <option value="Travail">💼 Travail</option>
      <option value="Personnel">🏠 Personnel</option>
      <option value="Études">🎓 Études</option>
    </select>
  </div>
</div>


        <div className="space-y-3">
  {tasks.length === 0 ? (
    <p className="text-center text-gray-400 py-10">Aucune tâche pour le moment...</p>
  ) : (
    filteredTasks.map(task => (
      <div 
        key={task.id} 
        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
          task.completed ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-100 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-4">
          <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => setTasks(tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t))}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <div>
            <p className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.text}
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {task.category}
              </span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                task.priority === 'Haute' ? 'bg-red-50 text-red-600' : 
                task.priority === 'Moyenne' ? 'bg-orange-50 text-orange-300' : 'bg-green-50 text-green-600'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          🗑️
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