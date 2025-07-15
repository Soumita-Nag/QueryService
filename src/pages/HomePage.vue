<template>
    <HeroSectionHP @activate="passToApp"/>
    <RecentQueriesHP/>
</template>
<script setup>
import HeroSectionHP from '@/components/HomePage/HeroSectionHP.vue';
import RecentQueriesHP from '@/components/HomePage/RecentQueriesHP.vue';

const emit=defineEmits(['activate']);
const passToApp=(value,source)=>{
    emit('activate',value,source);
}
</script>
<style scoped>
    
</style>