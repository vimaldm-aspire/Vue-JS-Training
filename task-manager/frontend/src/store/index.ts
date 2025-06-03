import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,         // Logged-in user
    users: [],          // User list for admin management
    tasks: []           // Task list for charts and grids
  },

  mutations: {
    // Authentication
    setUser(state, user) {
      state.user = user;
    },

    // User list
    setUsers(state, users) {
      state.users = users;
    },

    // Task list
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
      const res = await axios.get('http://localhost:3001/api/users');
      commit('setUsers', res.data);
    },
    async addUser({ dispatch }, user) {
      await axios.post('http://localhost:3001/api/users', user);
      dispatch('fetchUsers');
    },
    async updateUser({ dispatch }, user) {
      await axios.put(`http://localhost:3001/api/users/${user.id}`, user);
      dispatch('fetchUsers');
    },
    async deleteUser({ dispatch }, id) {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      dispatch('fetchUsers');
    },

    // ✅ TASKS
    async fetchTasks({ commit }) {
      const res = await axios.get('http://localhost:3001/api/tasks');
      commit('setTasks', res.data);
    }
  }
});
