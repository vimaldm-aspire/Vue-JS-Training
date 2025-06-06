<template>
  <div class="p-6 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Tasks</h1>

      <div class="flex space-x-2">
        <router-link
          to="/tasks/add"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </router-link>
        <router-link
          to="/dashboard"
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Go to Dashboard
        </router-link>
      </div>
      <Navbar />
    </div>

    <!-- Filters -->
    <Accordion title="Filter Options">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <input
          v-model="filters.title"
          placeholder="Filter by title"
          class="border p-2 rounded"
        />
        <input
          v-model="filters.description"
          placeholder="Filter by description"
          class="border p-2 rounded"
        />

        <select v-model="filters.status" class="border p-2 rounded">
          <option value="">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select v-model="filters.userId" class="border p-2 rounded">
          <option value="">All Users</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>
    </Accordion>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 mt-6 pb-5"
    >
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
        :class="[ 'px-3 py-1 rounded', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200' ]"
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
    <Spinner v-if="isLoading" class="my-6" />

    <!-- Task Table -->
    <table class="w-full border border-gray-300 text-sm text-left">
      <thead>
        <tr class="bg-gray-100 text-gray-700">
          <th class="p-3 border border-gray-300">Title</th>
          <th class="p-3 border border-gray-300">Description</th>
          <th class="p-3 border border-gray-300">Status</th>
          <th class="p-3 border border-gray-300">Assigned To</th>
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
          <td class="p-3 border border-gray-300" style="width: 40rem">
            {{ task.description }}
          </td>
          <td class="p-3 border border-gray-300">{{ task.status }}</td>
          <td class="p-3 border border-gray-300">
            {{ users.find(u => u.id === task.userId)?.username || 'Unassigned' }}
          </td>
          <td class="p-3 border border-gray-300 text-center space-x-2">
            <button
              @click="openEditModal(task)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
            <button
              @click="deleteTask(task.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p
      v-if="paginatedTasks.length === 0"
      class="text-center mt-4 text-gray-500"
    >
      No tasks found.
    </p>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 mt-6"
    >
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
        :class="[ 'px-3 py-1 rounded', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200' ]"
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

    <!-- Edit Modal Component -->
    <EditTaskModal
      :visible="showModal"
      :task="editTask"
      :users="users"
      @close="closeModal"
      @updated="onTaskUpdated"
    />
  </div>
  <Toast ref="toastRef" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { useStore } from 'vuex';
import { ref, computed, onMounted, watch } from 'vue';
import EditTaskModal from '@/components/EditTask.vue';
import Navbar from '@/components/Navbar.vue';
import Spinner from '@/components/Spinner.vue';
import Accordion from '@/components/Accordion.vue';
import Toast from '@/components/Toast.vue';

const store = useStore();
const currentUser = computed(() => store.getters.currentUser);
const isAdmin = computed(() => store.getters.isAdmin);
const toastRef = ref();

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  userId: number | null;
}

interface User {
  id: number;
  username: string;
}

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);

const filters = ref({
  title: '',
  description: '',
  status: '',
  userId: ''
});

const currentPage = ref(1);
const itemsPerPage = 10;

// Fetch tasks from server
const loadTasks = async () => {
  const res = await axios.get('http://localhost:3001/api/tasks');
  tasks.value = res.data;
};

// Fetch users from server
const loadUsers = async () => {
  const res = await axios.get('http://localhost:3001/api/users');
  users.value = res.data;
};

onMounted(() => {
  loadTasks();
  loadUsers();
});

// Watch for filter changes and reset to page 1
watch(filters, () => {
  currentPage.value = 1;
});

// Filter logic
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesFilters =
      (!filters.value.title || task.title.toLowerCase().includes(filters.value.title.toLowerCase())) &&
      (!filters.value.description || task.description.toLowerCase().includes(filters.value.description.toLowerCase())) &&
      (!filters.value.status || task.status === filters.value.status) &&
      (!filters.value.userId || task.userId === filters.value.userId);

    const isAdmin = currentUser.value.role === 'admin';
    const isAssignedUser = task.userId === currentUser.value.id;

    return matchesFilters && (isAdmin || isAssignedUser);
  });
});


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
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      await loadTasks();
      toastRef.value.showToast('Task deleted successfully', 'success');
    } catch (error) {
      toastRef.value.showToast('Failed to delete task', 'error');
    }
  }
};
// Modal control
const showModal = ref(false);
const editTask = ref<Task | null>(null);

const openEditModal = (task: Task) => {
  editTask.value = { ...task };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const onTaskUpdated = async () => {
  await loadTasks();
  closeModal();
};
</script>
