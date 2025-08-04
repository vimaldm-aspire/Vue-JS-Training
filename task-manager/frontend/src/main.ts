import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/tailwind.css';

// Step 1: Create app and pinia
const app = createApp(App);
const pinia = createPinia();

// Step 2: Use Pinia first
app.use(pinia);

// Step 3: Load auth store from localStorage before mount
import { useAuthStore } from './store/auth';
const authStore = useAuthStore();
authStore.loadFromStorage(); // ✅ Load saved user info

// Step 4: Use other stores and router
app.use(store).use(router).mount('#app');
