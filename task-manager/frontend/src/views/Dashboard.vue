<template>
  <div v-if="user" class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Welcome, {{ user.username }}!</h1>
    <p class="mb-4">Here's your dashboard content.</p>

    <!-- Navigate to Tasks Grid -->
    <router-link
      to="/tasks"
      class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Go to Tasks
    </router-link>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.user);
</script>
