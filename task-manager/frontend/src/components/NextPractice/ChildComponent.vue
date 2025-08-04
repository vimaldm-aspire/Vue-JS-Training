<template>
    <div>Child Component message from parent:{{message}}</div>
</template>
<script setup>
    import {ref, defineProps, defineEmits} from 'vue';
    const updateMessage =  ref('')
    const props =  defineProps({
        message:String
    })

    const emit = defineEmits([
       'updateMessage'
    ])
    emit('updateMessage','Child message')
</script>