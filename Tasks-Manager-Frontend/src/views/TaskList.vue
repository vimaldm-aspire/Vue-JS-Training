<template>
  <div class="max-w-6xl mx-auto p-6 bg-white rounded shadow">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Tasks</h2>
      <router-link
        to="/add"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </router-link>
    </div>

    <table class="min-w-full border rounded overflow-hidden shadow-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left px-4 py-2 border-b">Title</th>
          <th class="text-left px-4 py-2 border-b">Description</th>
          <th class="text-left px-4 py-2 border-b">Status</th>
          <th class="text-left px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="px-4 py-2 border-b font-medium">{{ task.title }}</td>
          <td class="px-4 py-2 border-b text-gray-700">{{ task.description }}</td>
          <td class="px-4 py-2 border-b">
            <span
              :class="[
                'inline-block px-2 py-1 rounded text-sm font-semibold',
                task.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ task.status }}
            </span>
          </td>
          <td class="px-4 py-2 border-b">
            <router-link
              :to="`/edit/${task.id}`"
              class="text-blue-600 hover:underline mr-4"
            >
              Edit
            </router-link>
            <button
              @click="deleteTask(task.id)"
              class="text-red-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="tasks.length === 0">
          <td colspan="4" class="text-center text-gray-500 py-4">
            No tasks found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTasks, deleteTask as removeTask } from '../services/api';

const tasks = ref([]);

const loadTasks = async () => {
  const res = await getTasks();
  tasks.value = res.data;
};

const deleteTask = async (id) => {
  await removeTask(id);
  loadTasks();
};

onMounted(loadTasks);
</script>
