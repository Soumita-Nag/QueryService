<template>
    <div class="">
        <div>
            <SideBar/>
        </div>
        <div class="p-4">
            <AskQueryForm :user="props.user"/>
        </div>
    </div>
</template>
<script setup>
import AskQueryForm from '@/components/AskQueries/AskQueryForm.vue';
import SideBar from '@/components/AskQueries/SideBar.vue';
import { defineProps } from 'vue';
const props=defineProps({
    user:Array,
})
</script>
<style scoped>
    
</style>