<template>
  <div class="p-6 mt-10 max-w-md mx-auto bg-white rounded shadow">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Add New Task</h2>
      <router-link
        to="/tasks"
        class="text-blue-600 hover:underline text-sm"
      >
        View Tasks
      </router-link>
    </div>    
    <form @submit.prevent="handleAdd" class="space-y-4">

      <!-- Title Field -->
      <div>
        <input
          v-model="title"
          placeholder="Title"
          class="w-full border p-2 rounded"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <!-- Description Field -->
      <div>
        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full border p-2 rounded"
        ></textarea>
        <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
      </div>

      <!-- Status Field -->
      <div>
        <select
          v-model="status"
          class="w-full border p-2 rounded"
        >
          <option disabled value="">Select status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
      </div>

      <!-- Assigned User Field -->
      <div>
        <select v-model="userId" class="w-full border p-2 rounded">
          <option disabled value="">Assign to user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
        <p v-if="errors.userId" class="text-red-500 text-sm mt-1">{{ errors.userId }}</p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Add Task
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Form fields
const title = ref('');
const description = ref('');
const status = ref('');
const userId = ref<number | ''>('');

const users = ref<{ id: number; username: string }[]>([]);

// Validation errors
const errors = ref({
  title: '',
  description: '',
  status: '',
  userId: ''
});

const router = useRouter();

const loadUsers = async () => {
  const res = await axios.get('http://localhost:3001/api/users');
  users.value = res.data;
};

onMounted(loadUsers);

// Form submission
const handleAdd = async () => {
  // Clear previous errors
  errors.value = { title: '', description: '', status: '' };

  let isValid = true;

  // Validate fields
  if (!title.value.trim()) {
    errors.value.title = 'Title is required';
    isValid = false;
  }
  if (!description.value.trim()) {
    errors.value.description = 'Description is required';
    isValid = false;
  }
  if (!status.value) {
    errors.value.status = 'Status is required';
    isValid = false;
  }
  if (!userId.value) {
    errors.value.userId = 'User assignment is required';
    isValid = false;
  }  

  // If valid, submit form
  if (isValid) {
    await axios.post('http://localhost:3001/api/tasks', {
      title: title.value,
      description: description.value,
      status: status.value,
      userId: userId.value
    });
    router.push('/tasks');
  }
};
</script>
