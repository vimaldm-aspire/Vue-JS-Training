<template>
    <div>
        <h2>Is Class Active</h2>
        <button
        @click="toggleActive"
        >
        Click
        </button>
    </div>
    <div
        :class="{'bg-green-500':isActive, 'bg-gray-200':!isActive}"
        >ToggleAction
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    const isActive = ref(false)
    function toggleActive(){
        isActive.value = !isActive.value;
    }
</script>


