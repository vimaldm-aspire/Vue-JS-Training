import { createStore } from 'vuex';
import axios from 'axios';
import { API_URL } from '../config'; // Import the config file

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),         // Logged-in user
    users: [],          // User list for admin management
    tasks: []           // Task list for charts and grids
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },

    setUsers(state, users) {
      state.users = users;
    },

    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  },

  actions: {
    // Login / Logout
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setUser', null);
    },

    // Users
    async fetchUsers({ commit }) {
      const res = await axios.get(`${API_URL}/users`); // Use the common API URL
      commit('setUsers', res.data);
    },
    async addUser({ dispatch }, user) {
      await axios.post(`${API_URL}/users`, user); // Use the common API URL
      dispatch('fetchUsers');
    },
    async updateUser({ dispatch }, user) {
      await axios.put(`${API_URL}/users/${user.id}`, user); // Use the common API URL
      dispatch('fetchUsers');
    },
    async deleteUser({ dispatch }, id) {
      await axios.delete(`${API_URL}/users/${id}`); // Use the common API URL
      dispatch('fetchUsers');
    },

    // ✅ TASKS
    async fetchTasks({ commit }) {
      const res = await axios.get(`${API_URL}/tasks`); // Use the common API URL
      commit('setTasks', res.data);
    }
  },
  getters: {
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  }  
});
