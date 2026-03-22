<script setup>
import { ref } from 'vue'
const tasks = ref([])
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>TaskFlow (Vue Starter)</h1>
    <p>Bienvenue dans votre projet de gestion de tâches.</p>

    <div style="margin-bottom: 20px;">
      <input type="text" placeholder="Nouvelle tâche..." />
      <button>Ajouter</button>
    </div>

    <ul>
      <li>Exemple de tâche (à remplacer par vos composants)</li>
    </ul>
  </div>
</template>

<style scoped>
/* Vos styles ici */
</style>
