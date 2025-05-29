<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 class="text-lg font-bold mb-4">Edit Task</h2>

        <input
          v-model="localTask.title"
          class="w-full p-2 mb-3 border rounded"
          placeholder="Title"
        />
        <input
          v-model="localTask.description"
          class="w-full p-2 mb-3 border rounded"
          placeholder="Description"
        />
        <select v-model="localTask.status" class="w-full p-2 mb-4 border rounded">
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

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

const props = defineProps<{ task: any; visible: boolean }>();
const emit = defineEmits(['close', 'updated']);

const localTask = ref({ ...props.task });

watch(
  () => props.task,
  (newTask) => {
    localTask.value = { ...newTask };
  }
);

const submitEdit = async () => {
  try {
    await axios.put(`http://localhost:3001/api/tasks/${localTask.value.id}`, localTask.value);
    emit('updated');
  } catch (err) {
    alert('Failed to update task.');
  }
};
</script>
