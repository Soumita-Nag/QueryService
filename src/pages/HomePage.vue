<template>
    <HeroSectionHP @activate="passToApp" :islogin="islogin" :allQueries="props.allQueries"/>
    <RecentQueriesHP/>
</template>
<script setup>
import HeroSectionHP from '@/components/HomePage/HeroSectionHP.vue';
import RecentQueriesHP from '@/components/HomePage/RecentQueriesHP.vue';
import { defineProps } from 'vue';

const emit=defineEmits(['activate']);
const props=defineProps({
    islogin:Boolean,
    allQueries:Array,
})
const passToApp=(value,source)=>{
    emit('activate',value,source);
}
</script>
<style scoped>
    
</style>