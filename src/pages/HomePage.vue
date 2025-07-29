<template>
    <HeroSectionHP @activate="passToApp" :islogin="islogin" :allQueries="props.allQueries"/>
    <RecentQueriesHP @activate="passToApp" @queryId="sendQueryId"/>
</template>
<script setup>
import HeroSectionHP from '@/components/HomePage/HeroSectionHP.vue';
import RecentQueriesHP from '@/components/HomePage/RecentQueriesHP.vue';
import { defineProps } from 'vue';

const emit=defineEmits(['activate','queryId']);
const props=defineProps({
    islogin:Boolean,
    allQueries:Array,
})
const passToApp=(value,source)=>{
    emit('activate',value,source);
}
const sendQueryId=(query)=>{
    emit('queryId',query);
}
</script>
<style scoped>
    
</style>