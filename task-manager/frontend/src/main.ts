import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // ✅ Correct import from store/index.ts
import router from './router';
import './assets/tailwind.css';

createApp(App)
  .use(store)   // ✅ Use full-featured store
  .use(router)
  .mount('#app');
