<!-- components/Accordion.vue -->
<template>
  <div class="mb-6 border border-gray-300 rounded-lg overflow-hidden">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-200"
      @click="toggle"
    >
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <svg
        :class="['w-5 h-5 transform transition-transform duration-300', { 'rotate-180': isOpen }]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Content -->
    <transition name="accordion">
      <div v-show="isOpen" class="px-4 py-3 border-t border-gray-200 bg-white">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  overflow: hidden;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
}
</style>
