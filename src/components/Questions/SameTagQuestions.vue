<template>
  <div class="w-full max-w-[90rem] mx-auto space-y-4 pt-20">
    <div class="cursor-pointer space-y-4 bg-white shadow-md rounded-xl p-4" v-for="p in props.searchQuery" :key="p.queryId">
    <div @click="showAnswer(p)" class="space-y-4 ">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">{{ p.queryTitle }}</h1>
      <h4 class="text-md text-gray-600 mt-2 truncate">{{ p.query }}</h4>
      <button v-for="cat in p.category" class="mt-2 mr-4 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
        {{ cat }}
      </button>
    </div>
    <div class="flex gap-6 text-gray-600 text-sm items-center">
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        {{ p.like }}
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h10l4 4v-6a2 2 0 002-2z" />
        </svg>
        {{ p.ansCount }}
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
        </svg>
        {{ p.views }}
      </div>
    </div>
    <div class="text-xs text-gray-500">
      {{ p.userId }} asked on {{ p.date }} at {{ p.time }}
    </div>
   </div>
   </div>
  </div>
</template>
<script setup>
    const props=defineProps({
        searchQuery:Array,
    })
    const emit=defineEmits(['activate','queryId']);
    const showAnswer=(query)=>{
        emit('activate',true,'AnswerQuestions');
        emit('queryId',query);
    }
</script>
<style scoped>
    
</style>