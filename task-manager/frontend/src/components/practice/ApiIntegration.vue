<template>
    <h2>API Fetch Users List</h2>
    <div>
        <ul>
           <li v-for="user in users" :key="user.id">
            {{user.name}}, {{user.email}}
           </li> 
        </ul>
    </div>
</template>
<script setup>
    import {ref, onMounted} from 'vue';
    const users = ref([])
    onMounted(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            users.value = data
        } catch (error) {
            console.log(error)
        }
    })
</script>