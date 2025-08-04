<template>
    <div>
        <h2>Conditional Rendering</h2>
    </div>
    <button
        v-if="!isLoggedIn"
        @click="checkLogin"
        class="bg-blue-500"
    >
    Login
    </button>
    <button
        v-else
        @click="checkLogin"
        class="bg-red-500"
    >
    Logout
    </button>
    <p v-if="!isLoggedIn">Need to login</p>
    <p v-else>Logged in</p>
</template>

<script setup>
    import {ref} from 'vue';
    const isLoggedIn = ref(false);
    function checkLogin() {
        isLoggedIn.value = !isLoggedIn.value;        
    }
</script>