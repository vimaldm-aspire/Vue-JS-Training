<!-- Example: Navbar.vue -->
<template>
  <Suspense>
  <div class="flex justify-end p-4 bg-white shadow">
    <button
      @click="handleLogout"
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
  </Suspense>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const handleLogout = () => {
  store.dispatch('logout');
  router.push('/');
};
</script>
