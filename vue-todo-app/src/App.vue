<template>
  <div class="todo-app">
    <h1>📝 To-Do Lists</h1>

    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Add a new task"
    />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <label>
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ done: task.completed }">{{ task.text }}</span>
        </label>
        <button @click="removeTask(index)">❌</button>
      </li>
    </ul>

    <p v-if="tasks.length === 0">No tasks yet. Add one!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([])

function addTask() {
  const trimmed = newTask.value.trim()
  if (trimmed) {
    tasks.value.push({ text: trimmed, completed: false })
    newTask.value = ''
  }
}

function removeTask(index) {
  tasks.value.splice(index, 1)
}
</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input[type="text"] {
  width: 70%;
  padding: 0.5em;
  margin-right: 0.5em;
}

button {
  padding: 0.4em 0.8em;
  margin-top: 0.5em;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 0.5em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
