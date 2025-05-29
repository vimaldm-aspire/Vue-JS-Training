<template>
  <div class="p-6 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Tasks</h1>
      <router-link to="/tasks/add" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Task
      </router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-4">
      <input v-model="filters.title" placeholder="Filter by title" class="border p-2 rounded w-1/2" />
      <select v-model="filters.status" class="border p-2 rounded w-1/2">
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
<!-- Task Table -->
<table class="w-full border border-gray-300 text-sm text-left">
  <thead>
    <tr class="bg-gray-100 text-gray-700">
      <th class="p-3 border border-gray-300">Title</th>
      <th class="p-3 border border-gray-300">Description</th>
      <th class="p-3 border border-gray-300">Status</th>
      <th class="p-3 border border-gray-300 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="(task, index) in paginatedTasks"
      :key="task.id"
      :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
      class="hover:bg-blue-50"
    >
      <td class="p-3 border border-gray-300">{{ task.title }}</td>
      <td class="p-3 border border-gray-300">{{ task.description }}</td>
      <td class="p-3 border border-gray-300">{{ task.status }}</td>
      <td class="p-3 border border-gray-300 text-center">
        <button @click="openEditModal(task)" class="text-blue-600 hover:underline mr-4">Edit</button>
        <button @click="deleteTask(task.id)" class="text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


    <p v-if="paginatedTasks.length === 0" class="text-center mt-4 text-gray-500">No tasks found.</p>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6">
      <button
        class="px-3 py-1 bg-gray-200 rounded"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Prev
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded',
          currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
        ]"
      >
        {{ page }}
      </button>
      <button
        class="px-3 py-1 bg-gray-200 rounded"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
        <h2 class="text-xl font-semibold mb-4">Edit Task</h2>

        <input v-model="editTask.title" class="w-full p-2 mb-3 border rounded" placeholder="Title" />
        <input v-model="editTask.description" class="w-full p-2 mb-3 border rounded" placeholder="Description" />
        <select v-model="editTask.status" class="w-full p-2 mb-4 border rounded">
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="saveEdit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

const tasks = ref<Task[]>([]);
const filters = ref({ title: '', status: '' });

const currentPage = ref(1);
const itemsPerPage = 10;

const loadTasks = async () => {
  const res = await axios.get('http://localhost:3001/api/tasks');
  tasks.value = res.data;
};

onMounted(loadTasks);

// Recalculate page when filtering changes
watch(filters, () => {
  currentPage.value = 1;
});

const filteredTasks = computed(() =>
  tasks.value.filter(task =>
    (!filters.value.title || task.title.toLowerCase().includes(filters.value.title.toLowerCase())) &&
    (!filters.value.status || task.status === filters.value.status)
  )
);

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / itemsPerPage));

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTasks.value.slice(start, start + itemsPerPage);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const deleteTask = async (id: number) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await axios.delete(`http://localhost:3001/api/tasks/${id}`);
    await loadTasks();
  }
};

// Modal
const showModal = ref(false);
const editTask = ref<Partial<Task>>({});

const openEditModal = (task: Task) => {
  editTask.value = { ...task };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveEdit = async () => {
  if (!editTask.value.title || !editTask.value.description || !editTask.value.status) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    await axios.put(`http://localhost:3001/api/tasks/${editTask.value.id}`, editTask.value);
    await loadTasks();
    closeModal();
  } catch (err) {
    alert('Failed to update task.');
  }
};
</script>
