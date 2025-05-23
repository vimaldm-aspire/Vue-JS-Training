<template>
  <TaskGrid @edit="openEditModal" />
  <TaskModal v-if="showModal" :task="editableTask" @close="showModal = false" @save="saveTask" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import TaskGrid from './components/TaskGrid.vue'
import TaskModal from './components/TaskModal.vue'

const store = useStore()
const showModal = ref(false)
const editableTask = ref(null)

onMounted(() => {
  store.dispatch('loadTasks')
})

function openEditModal(task) {
  editableTask.value = { ...task } // Clone to avoid direct mutation
  showModal.value = true
}

function saveTask(task) {
  store.dispatch('editTask', task)
  showModal.value = false
}
</script>
