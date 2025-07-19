<template>
    <div class="p-4">
        <AskQueryForm :user="props.user"/>
    </div>
</template>
<script setup>
import AskQueryForm from '@/components/AskQueries/AskQueryForm.vue';
import { defineProps } from 'vue';
const props=defineProps({
    user:Array,
})
</script>
<style scoped>
    
</style>