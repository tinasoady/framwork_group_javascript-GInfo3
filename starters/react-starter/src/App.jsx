import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>TaskFlow (React Starter)</h1>
      <p>Bienvenue dans votre projet de gestion de tâches.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Nouvelle tâche..." />
        <button>Ajouter</button>
      </div>

      <ul>
        <li>Exemple de tâche (à remplacer par vos composants)</li>
      </ul>
    </div>
  )
}

export default App
