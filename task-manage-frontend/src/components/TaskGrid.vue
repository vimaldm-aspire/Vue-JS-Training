<template>
  <div class="task-grid">
    <div class="header">
      <input v-model="search" placeholder="Search tasks..." class="search-input" />
      <!-- Add Task Button -->
      <button class="add-task-btn" @click="openModal">Add Task</button>
    </div>

    <!-- Add Task Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Add Task</h2>
        <form @submit.prevent="submitTask">
          <input v-model="task.name" placeholder="Task name" required />
          <button type="submit">Add Task</button>
          <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>

    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th style="width: 150px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in paginatedTasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>
            <button class="btn edit" @click="$emit('edit', task)">Edit</button>
            <button class="btn delete" @click="deleteTask(task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button 
        class="page-button" 
        :disabled="currentPage <= 1"
        @click="goToPreviousPage"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        class="page-button" 
        :disabled="currentPage >= totalPages"
        @click="goToNextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const search = computed({
  get: () => store.state.search,
  set: val => store.commit('setSearch', val)
})
const filteredTasks = computed(() => store.getters.filteredTasks)

const currentPage = computed(() => store.state.currentPage)
const totalPages = computed(() => store.getters.totalPages)
const paginatedTasks = computed(() => store.getters.paginatedTasks)

const showModal = ref(false) // To toggle modal visibility
const task = ref({ name: '' }) // New task object

// Method to open the modal
function openModal() {
  showModal.value = true
}

// Method to close the modal
function closeModal() {
  showModal.value = false
  task.value.name = '' // Reset task name
}

// Method to submit the new task
function submitTask() {
  store.dispatch('createTask', task.value) // Dispatch to Vuex
  closeModal() // Close the modal after adding the task
}

// Method to delete task
function deleteTask(id) {
  store.dispatch('removeTask', id)
}

// Method to go to the previous page
function goToPreviousPage() {
  if (currentPage.value > 1) {
    store.dispatch('changePage', currentPage.value - 1)
  }
}

// Method to go to the next page
function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    store.dispatch('changePage', currentPage.value + 1)
  }
}
</script>

<style scoped>
.task-grid {
  max-width: 600px;
  margin: 30px auto;
  padding: 10px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-input {
  width: 80%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

.add-task-btn {
  padding: 8px 12px;
  background-color: #27ae60;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: #2ecc71;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.task-table th {
  background: #f0f0f0;
  font-weight: 600;
}

.btn {
  padding: 6px 10px;
  margin-right: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
}

.btn.edit {
  background-color: #3498db;
}

.btn.delete {
  background-color: #e74c3c;
}

.btn:hover {
  opacity: 0.9;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
}

.page-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
}

.page-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.page-button:hover {
  opacity: 0.8;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 15px;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-content button {
  padding: 10px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
}

.modal-content button:hover {
  background-color: #2ecc71;
}

.cancel-btn {
  background-color: #e74c3c;
}

.cancel-btn:hover {
  background-color: #c0392b;
}
</style>
