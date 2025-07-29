<template>
  <div class="flex flex-col items-center mt-10 sm:mx-5 mx-2 xl:mx-15 lg:mx-10">
    <div><h1 class="text-3xl font-bold mb-6">Recent Queries</h1></div>

    <div v-if="!isloading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <div v-for="query in allQueries" :key="query.queryId" class="bg-white shadow-md rounded-xl p-4 border border-gray-200 transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
        <div class="text-sm text-gray-500 mb-2">{{ query.date }}</div>
        <div class="font-semibold mb-1">{{ query.queryTitle }}</div>
        <div class="text-gray-700 text-sm truncate mb-2">
          Q. {{ query.query }}
        </div>
        <div class="text-xs text-gray-500">Answers: {{ query.ansCount }}</div>
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