<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Reusable Modal Example</h2>

    <button 
      @click="isModalVisible = true" 
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Open Modal
    </button>

    <BaseModal :show="isModalVisible" @close="isModalVisible = false">
      <template #default>
        <h3 class="text-lg font-bold mb-2">Welcome!</h3>
        <p>This is reusable modal content.</p>
      </template>

      <template #footer>
        <button 
          @click="isModalVisible = false" 
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

const isModalVisible = ref(false)
</script>
