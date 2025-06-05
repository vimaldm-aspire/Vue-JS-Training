<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div class="modal-box bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 class="text-lg font-bold mb-4">Edit Task</h2>

        <!-- Title Input -->
        <div class="mb-3">
          <input
            v-model="localTask.title"
            class="w-full p-2 border rounded"
            placeholder="Title"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
        </div>

        <!-- Description Input -->
        <div class="mb-3">
          <textarea
            v-model="localTask.description"
            class="w-full p-2 border rounded"
            rows="3"
            placeholder="Description"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
        </div>

        <!-- Status Dropdown -->
        <div class="mb-3">
          <select v-model="localTask.status" class="w-full p-2 border rounded">
            <option disabled value="">Select status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
        </div>

        <!-- User Dropdown -->
        <div class="mb-4">
          <select v-model="localTask.userId" class="w-full p-2 border rounded">
            <option value="">Select User</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            @click="submitEdit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';

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

const props = defineProps<{
  visible: boolean;
  task: Task | null;
  users: User[];
}>();

const emit = defineEmits(['close', 'updated']);

const localTask = ref<Task>({
  id: 0,
  title: '',
  description: '',
  status: 'Todo',
  userId: null
});

const errors = ref({
  title: '',
  description: '',
  status: ''
});

const resetErrors = () => {
  errors.value = {
    title: '',
    description: '',
    status: ''
  };
};

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      localTask.value = { ...newTask };
    }
    resetErrors();
  },
  { immediate: true }
);


const validate = () => {
  let valid = true;
  resetErrors();

  if (!localTask.value.title.trim()) {
    errors.value.title = 'Title is required';
    valid = false;
  }
  if (!localTask.value.description.trim()) {
    errors.value.description = 'Description is required';
    valid = false;
  }
  if (!localTask.value.status) {
    errors.value.status = 'Status is required';
    valid = false;
  }

  return valid;
};

const submitEdit = async () => {
  if (!validate()) return;

  try {
    await axios.put(`http://localhost:3001/api/tasks/${localTask.value.id}`, localTask.value);
    emit('updated');
  } catch (err) {
    alert('Failed to update task.');
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
}
</style>
