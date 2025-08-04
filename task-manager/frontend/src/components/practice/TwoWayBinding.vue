<template>
    <div><h2>Two way binding</h2></div>
    <input 
        type="text"
        placeholder="Enter search tex"
        v-model="searchtext"
        class="mb-2"
    />
    <div><p>Typed text here:: {{searchtext}}</p></div>
</template>

<script setup>
    import {ref} from 'vue';
    const searchtext = ref('');
</script>