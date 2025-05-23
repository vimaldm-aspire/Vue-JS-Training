<template>
  <div class="add-task">
    <h2>Add Task</h2>
    <form @submit.prevent="submitTask">
      <input v-model="task.name" placeholder="Task name" required />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const task = ref({ name: '' })
const router = useRouter()
const store = useStore()

function submitTask() {
  store.dispatch('createTask', task.value)
  router.push('/') // Redirect to the task list or home page
}
</script>

<style scoped>
.add-task {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.add-task h2 {
  text-align: center;
}

.add-task input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.add-task button {
  width: 100%;
  padding: 10px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
}

.add-task button:hover {
  background-color: #2ecc71;
}
</style>
