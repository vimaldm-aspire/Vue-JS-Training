<template>
    <div>
        <h2>List Rendering</h2>
        <ul>
            <li v-for="(user,index) in users" :key="index">
            {{index +1}}, {{user.fname}}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    const users = ref([
        {fname:"Vimal", lname:"David"},
        {fname:"Test", lname:"User"},        
    ]);
</script>