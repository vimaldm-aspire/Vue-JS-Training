<template>
  <div>
    <h2>📝 Tasks</h2>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Add new task" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.completed" @change="toggleTask(index)" />
        <span :class="{ done: task.completed }">{{ task.text }}</span>
        <button @click="removeTask(index)">❌</button>
      </li>
    </ul>

    <p>Total completed: {{ completedCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const newTask = ref('')

const tasks = computed(() => store.state.tasks)
const completedCount = computed(() => store.getters.completedCount)

function addTask() {
  if (newTask.value.trim()) {
    store.dispatch('addTask', newTask.value.trim())
    newTask.value = ''
  }
}

function removeTask(index) {
  store.dispatch('removeTask', index)
}

function toggleTask(index) {
  store.dispatch('toggleTask', index)
}

onMounted(() => {
  store.dispatch('loadFromStorage')
  if (store.state.tasks.length === 0) {
    store.dispatch('loadTasks') // fallback to JSON if no localStorage
  }
})
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
