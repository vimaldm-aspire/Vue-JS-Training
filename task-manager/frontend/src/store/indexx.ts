import { createStore } from 'vuex'

const store = createStore({
  state: {
    counter: 0
  },
  mutations: {
    INCREMENT(state) {
      state.counter++
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    }
  },
  getters: {
    getCounter(state) {
      return state.counter
    }
  }
})

export default store
