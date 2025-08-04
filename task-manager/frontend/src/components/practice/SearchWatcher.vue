<template>
    <div>
        <h2>Search watcher</h2>
    </div>
    <input
        placeholder="Search Text"
        v-model="searchText" 
    />
</template>

<script setup>
    import {ref, watch} from 'vue';
    const searchText = ref('');

    watch(searchText, (newText, oldText) => {
        console.log('Old Text: '+ oldText +','+ 'New text: '+ newText);
    })
</script>