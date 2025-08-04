<template>
    <h2>Child Component</h2>
    <div>Recieved child message: {{message}}</div>
    <input
        placeholder="Type Here"
        v-model="childmessage"
    />
    <button
    @click="sendMessage"
    >
    Click to send message to parent
    </button>
</template>

<script setup>
    import {ref} from 'vue';
    import {defineProps, defineEmits} from 'vue';

    const props = defineProps({
        message: String
    })

    const emit = defineEmits([
        'update-message'
    ])
    const childmessage = ref('')
    function sendMessage(){
        emit('update-message',childmessage.value)
    }
</script>