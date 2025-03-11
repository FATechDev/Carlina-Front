<!-- src/components/RecipeCard.vue -->
<template>
    <div v-if="recipe">
      <img :src="recipe.image" :alt="recipe.name" class="w-full h-auto" />
      <h1 class="text-4xl font-bold">{{ recipe.name }}</h1>
      <p class="text-gray-700">{{ recipe.description }}</p>
    </div>
    <div v-else>
      <p>Recette non trouvée</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
  }
  
  const props = defineProps<{ recipe: Recipe }>();
  </script>
  