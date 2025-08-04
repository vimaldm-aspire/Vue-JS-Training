<template>
    <h2>API Integration - List Users</h2>
    <div>
        <ul>
            <li v-for="(user, index) in users" :key="index">
                {{index++}}. {{user.name}}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    const users = ref()
    onMounted (async() =>
        {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            users.value = data 
        }
    )
</script>