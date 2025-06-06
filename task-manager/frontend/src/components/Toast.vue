<!-- components/Toast.vue -->
<template>
  <div
    v-if="visible"
    :class="[
      'fixed bottom-5 right-5 px-4 py-3 rounded shadow-lg text-white z-50 transition-all duration-300',
      type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
      'bg-yellow-500'
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const message = ref('');
const type = ref<'success' | 'error' | 'warning'>('success');

const showToast = (msg: string, toastType: 'success' | 'error' | 'warning' = 'success') => {
  message.value = msg;
  type.value = toastType;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

// Expose function
defineExpose({ showToast });
</script>
