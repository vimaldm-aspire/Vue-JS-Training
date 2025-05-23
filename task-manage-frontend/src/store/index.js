import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export default createStore({
  state: {
    tasks: [],
    search: '',
    currentPage: 1,         // Added for pagination
    tasksPerPage: 5,        // Number of tasks to display per page
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, task) {
      const i = state.tasks.findIndex(t => t.id === task.id)
      if (i !== -1) state.tasks[i] = task
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
    },
    setSearch(state, val) {
      state.search = val
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async loadTasks({ commit }) {
      const { data } = await axios.get(`${API_URL}/tasks`)
      commit('setTasks', data)
    },
    async createTask({ commit }, task) {
      const { data } = await axios.post(`${API_URL}/tasks`, task)
      commit('addTask', data)
    },
    async editTask({ commit }, task) {
      const { data } = await axios.put(`${API_URL}/tasks/${task.id}`, task)
      commit('updateTask', data)
    },
    async removeTask({ commit }, id) {
      await axios.delete(`${API_URL}/tasks/${id}`)
      commit('deleteTask', id)
    },
    changePage({ commit, dispatch }, page) {
      commit('setCurrentPage', page)
      dispatch('loadTasks')
    }
  },
  getters: {
    filteredTasks: state => {
      return state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.search.toLowerCase())
      )
    },
    paginatedTasks: (state, getters) => {
      const startIndex = (state.currentPage - 1) * state.tasksPerPage
      const endIndex = startIndex + state.tasksPerPage
      return getters.filteredTasks.slice(startIndex, endIndex)
    },
    totalPages: state => {
      return Math.ceil(state.tasks.length / state.tasksPerPage)
    }
  }
})
