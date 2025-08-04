<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Vuex Counter</h2>

    <p>Counter: {{ counter }}</p>

    <button 
      @click="incrementCounter"
      class="bg-blue-500 text-white px-4 py-2 rounded mt-2"
    >
      Increment
    </button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const counter = computed(() => store.getters.getCounter)

function incrementCounter() {
  store.dispatch('increment')
}
</script>
