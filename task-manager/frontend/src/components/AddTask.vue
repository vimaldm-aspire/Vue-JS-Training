<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Add New Task</h2>
    <form @submit.prevent="handleAdd" class="space-y-4">
      <input v-model="title" placeholder="Title" class="w-full border p-2 rounded" />
      <textarea v-model="description" placeholder="Description" class="w-full border p-2 rounded"></textarea>
      <select v-model="status" class="w-full border p-2 rounded">
        <option disabled value="">Select status</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Task</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const title = ref('');
const description = ref('');
const status = ref('');
const router = useRouter();

const handleAdd = async () => {
  await axios.post('http://localhost:3001/api/tasks', {
    title: title.value,
    description: description.value,
    status: status.value
  });
  router.push('/tasks');
};
</script>
