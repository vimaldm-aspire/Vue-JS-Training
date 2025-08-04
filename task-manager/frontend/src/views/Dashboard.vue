<template>
  <div class="p-2">
    <h1 class="text-2xl font-semibold mb-4">Welcome, {{ authStore.username }}!</h1>
    <p class="mb-4">Here's your dashboard content.</p>

    <!-- Links -->
    <div class="mt-2 flex flex-wrap gap-2">
      <router-link
        to="/tasks"
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Go to Tasks
      </router-link>
      &nbsp;&nbsp;&nbsp;
      <router-link
        v-if="isAdmin === 'admin'"
        to="/users"
        class="px-6 py-3 bg-gray-100 text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition duration-300 ease-in-out"
      >
        Manage Users
      </router-link>

      <button
        v-else
        @click="showAccessDenied"
        class="px-6 py-3 bg-gray-300 text-gray-600 font-semibold rounded-lg shadow cursor-not-allowed"
      >
        Manage Users
      </button>

    </div>
  </div>
    <!-- Task Chart -->
    <TaskChart v-if="tasks && tasks.length" :tasks="tasks" />
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TaskChart from '../components/TaskChart.vue';
import { useAuthStore } from '../store/auth'; // adjust path as needed


const store = useStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.isAdmin);         // true/false

const tasks = computed(() => store.state.tasks || []); // <-- protect against undefined

onMounted(async () => {
  if (!store.state.tasks || !store.state.tasks.length) {
    await store.dispatch('fetchTasks');
  }
});

function showAccessDenied() {
  alert('Only admin role can access this page.');
}

</script>


