<template>
  <div class="w-full max-w-[90rem] mx-auto space-y-2 pt-22">
    <div class="relative w-full">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </span>
      <input
        v-model="search"
        type="text"
        placeholder="Search queries..."
        class="w-full pl-10 pr-4 py-3 border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
        @keyup="fetchQueries"
      />
    </div>

    <div class="relative w-full mt-3">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M3 7a4 4 0 014-4h4.586a1 1 0 01.707.293l7.414 7.414a2 2 0 010 2.828l-4.586 4.586a2 2 0 01-2.828 0L3.293 11.707A1 1 0 013 11V7z" />
        </svg>
      </span>
      <input
        v-model="tags"
        type="text"
        placeholder="Enter tags (comma separated)"
        class="w-full pl-10 pr-4 py-3 border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
        @keyup="fetchQueries"
      />
    </div>


  <div v-if="props.searchQuery.length > 0">
   <div class="cursor-pointer space-y-4 bg-white shadow-md rounded-xl p-4 mb-4" v-for="p in props.searchQuery" :key="p.queryId">
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
   <p v-else class="text-gray-500">No queries found.</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const emit=defineEmits(['searchQuery','activate','queryId'])
const search = ref("");
const tags = ref("");    

const props=defineProps({
  searchQuery:Array,
})
const fetchQueries = () => {
  const searchQuery={
    query:search.value,
    tags:tags.value
  }
  emit('searchQuery',searchQuery);
};
const showAnswer=(query)=>{
  emit('activate',true,'AnswerQuestions');
  emit('queryId',query);
}
onMounted(fetchQueries);
</script>
<style scoped>
    
</style>