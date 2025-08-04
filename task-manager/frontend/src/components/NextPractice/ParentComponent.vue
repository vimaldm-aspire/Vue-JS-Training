<template>
    <div>Parent Component message:{{message}}</div>
    <ChildComponent
    :message="message"
    @updateMessage="updateMessage"
    >
    </ChildComponent>
</template>
<script setup>
    import {ref} from 'vue'
    import ChildComponent from './ChildComponent.vue'
    const message = ref('Parent message')
    function updateMessage(newMessage){
        message.value = newMessage
    }
</script>