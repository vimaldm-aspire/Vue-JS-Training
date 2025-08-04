<template>
    <div>
        <h2>Parent Component</h2>
        <div>Parent Message: {{parentmessage}}</div>
    </div>
    <ChildComponent
    :message="parentmessage"
    @update-message="updateMessage"
    />
</template>
<script setup>
    import {ref} from 'vue';
    import ChildComponent from './ChildComponent.vue';
    const parentmessage = ref('Parent messaged you...!');

    function updateMessage(newMessage){
        parentmessage.value=newMessage
    }
</script>