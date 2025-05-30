import Vuex from 'vuex';
const store = new Vuex.Store({
    state: {
        tasks: [],
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        REMOVE_TASK(state, index) {
            state.tasks.splice(index, 1);
        },
        TOGGLE_TASK(state, index) {
            state.tasks[index].completed = !state.tasks[index].completed;
        }
    },
    actions: {
        async loadTasks({ commit }) {
            const res = await fetch('/src/assets/tasks.json');
            const data = await res.json();
            commit('SET_TASKS', data);
        },
        addTask({ commit, dispatch }, taskText) {
            const newTask = { text: taskText, completed: false };
            commit('ADD_TASK', newTask);
            dispatch('saveTasks');
        },
        removeTask({ commit, dispatch }, index) {
            commit('REMOVE_TASK', index);
            dispatch('saveTasks');
        },
        toggleTask({ commit, dispatch }, index) {
            commit('TOGGLE_TASK', index);
            dispatch('saveTasks');
        },
        saveTasks({ state }) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        loadFromStorage({ commit }) {
            const stored = localStorage.getItem('tasks');
            if (stored) {
                commit('SET_TASKS', JSON.parse(stored));
            }
        }
    },
    getters: {
        completedCount: (state) => state.tasks.filter(t => t.completed).length
    }
});
// Default export the store
export default store;
