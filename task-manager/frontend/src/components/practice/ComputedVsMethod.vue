<template>
    <div>
        <h2>Computed Vs Method</h2>
        <input
            v-model="inputtext"
            class="mp-2"
            placeholder="Type Here..."
        />
    </div>
    <div>Computed: {{reverseComputed}}</div>
    <div>Method: {{reverseMethod()}}</div>
</template>

<script setup>
    import {ref, computed} from "vue";

    const inputtext = ref('')

    const reverseComputed = computed(()=>{
        console.log('Computed call')
        return inputtext.value.split('').reverse().join('')
    })

    function reverseMethod(){
        console.log('Method call')
        return inputtext.value.split('').reverse().join('')
    }
</script>