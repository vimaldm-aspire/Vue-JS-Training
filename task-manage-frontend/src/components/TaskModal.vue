<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Edit Task</h2>
      <input class="txtbox" v-model="localTask.name" />
      <div class="actions">
        <button class="btn edit" @click="emitSave">Save</button>
        <button class="btn delete" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(['task'])
const emit = defineEmits(['save', 'close'])

const localTask = reactive({ id: '', name: '' })

watch(() => props.task, task => {
  if (task) {
    localTask.id = task.id
    localTask.name = task.name
  }
}, { immediate: true })

function emitSave() {
  emit('save', { ...localTask })
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 6px 10px;
  margin-right: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
}

.btn.edit {
  background-color: #3498db;
}

.btn.delete {
  background-color: #e74c3c;
}

.txtbox {
    width: 100%;
    height: 2rem;
}
</style>
