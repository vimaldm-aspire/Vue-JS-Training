<template>
    <div>
        <h1>V-Model - TwoWay Binding</h1>
        <input v-model="message" class="border border-gray-300" />
        <p>{{message}}</p>
    </div>
    <div>
        <h1>V-Binding</h1>
        <img v-bind:src="imageurl" />
    </div>
    <div>
        <h1>V-On</h1>
        <button v-on:click="sendMessage" class="border border-gray-300 bg-blue-500 text-white rounded-lg">Send Message</button>
    </div>
    <div>
        <h1>V-If</h1>
        <button @click="enable" class="bg-green-500 rounded-lg button">Click Me</button>
        <span v-if="toggle">Now your clicked...!</span>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const message = ref('')
    const imageurl = ref('https://dev-bay.com/wp-content/uploads/2022/02/2022-02-07_22h02_55.png')
    const toggle =  ref(false)
    function sendMessage(){
        alert('V-On Clicked...!')
    }

    function enable(){
        toggle.value = true
    }
</script>