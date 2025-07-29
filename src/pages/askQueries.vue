<template>
    <div class="">
        <div>
            <SideBar :query="props.query" @activate="passToApp" @queryId="sendQueryId"/>
        </div>
        <div class="p-4">
            <AskQueryForm :user="props.user" @addQuery="addQuery"/>
        </div>
    </div>
</template>
<script setup>
import AskQueryForm from '@/components/AskQueries/AskQueryForm.vue';
import SideBar from '@/components/AskQueries/SideBar.vue';
import { defineProps } from 'vue';
const props=defineProps({
    user:Object,
    query:Array,
})
const emit=defineEmits(['addQuery','activate','queryId']);
const addQuery=(val)=>{
    emit('addQuery',val);
    // console.log(val);
}
const passToApp=(value,source)=>{
    emit('activate',value,source);
}
const sendQueryId=(query)=>{
    emit('queryId',query);
}
</script>
<style scoped>
    
</style>