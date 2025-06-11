<template>
  <div class="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">
      {{ isEdit ? 'Edit' : 'Add' }} Task
    </h2>

    <form @submit.prevent="saveTask" class="space-y-5">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          v-model="task.title"
          type="text"
          placeholder="Enter task title"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="task.description"
          placeholder="Enter task description"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="task.status"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">-- Select status --</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="text-center pt-4">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTask, createTask, updateTask } from '../services/api';

const route = useRoute();
const router = useRouter();
const task = ref({ title: '', description: '', status: '' });
const isEdit = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    const res = await getTask(route.params.id);
    task.value = res.data;
  }
});

const saveTask = async () => {
  if (isEdit.value) {
    await updateTask(route.params.id, task.value);
  } else {
    await createTask(task.value);
  }
  router.push('/');
};
</script>
