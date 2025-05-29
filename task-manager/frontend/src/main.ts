import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import router from './router';
import './assets/tailwind.css';

// Create Vuex store
const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
  },
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
