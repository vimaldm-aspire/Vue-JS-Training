<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 relative">
      
      <!-- Close button -->
      <button 
        @click="$emit('close')" 
        class="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      <!-- Main content slot -->
      <slot />

      <!-- Footer slot (optional) -->
      <div class="mt-4 text-right">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean
})

defineEmits(['close'])
</script>
