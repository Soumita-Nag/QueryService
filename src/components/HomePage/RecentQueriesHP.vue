<template>
  <div class="flex flex-col items-center mt-10 sm:mx-5 mx-2 xl:mx-15 lg:mx-10 mb-20">
    <div><h1 class="text-3xl font-bold mb-6">Recent Queries</h1></div>

    <div v-if="!isloading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <div v-for="query in allQueries" :key="query.queryId" class="bg-white shadow-md rounded-xl p-4 border border-gray-200 transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
        <div class="text-sm text-gray-500 mb-2 flex justify-between ">
          <span class="text-blue-700">{{ query.date }}, <span class="text-[0.7rem]">{{ query.time }}</span></span>
          <span><button class=" px-3 py-1 bg-blue-100 text-blue-700 text-[0.65rem] font-medium rounded-full">{{ query.category }}</button></span>
        </div>
        <div class="font-semibold mb-1">{{ query.queryTitle }}</div>
        <div class="text-gray-700 text-sm truncate mb-2">
          Q. {{ query.query }}
        </div>
        <div class="text-xs text-gray-500 flex gap-3">
          <span class="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            {{ query.like }}
          </span>
          <span class="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h10l4 4v-6a2 2 0 002-2z" />
            </svg>
            {{ query.ansCount }}
          </span>
          <span class="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
            </svg>
            {{ query.views }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <div v-for="n in 8" :key="n" class="animate-pulse bg-gray-200 h-30 rounded-lg "></div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';

var allQueries=ref([]);
var isloading=ref(true);
const getAllQuery = async () => {
  try {
    const data = await new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8000/getAllQuery",
        method: "GET",
        success: (data) => {
          resolve(data); 
        },
        error: (err) => {
          reject(err); 
        }
      });
    });
    allQueries.value = data;
    isloading.value=false;
    // console.log("Fetched Queries:", allQueries.value);
  } catch (err) {
    console.error("Error fetching queries:", err);
  }
};
onMounted(async()=>{
  await getAllQuery();
})
</script>
<style scoped>
    
</style>