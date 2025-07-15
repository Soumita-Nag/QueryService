<template>
  <div class="flex flex-col items-center mt-10 sm:mx-5 mx-2 xl:mx-15 lg:mx-10">
    <div><h1 class="text-3xl font-bold mb-6">Recent Queries</h1></div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <div
        v-for="i in 10"
        :key="i"
        class="bg-white shadow-md rounded-xl p-4 border border-gray-200 transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        <div class="text-sm text-gray-500 mb-2">{{ recentQuries.date }}</div>
        <div class="font-semibold mb-1">Q. {{ recentQuries.query }}</div>
        <div class="text-gray-700 text-sm truncate mb-2">
          Ans. {{ recentQuries.ans }}
        </div>
        <div class="text-xs text-gray-500">Answers: {{ recentQuries.ansCount }}</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                recentQuries:{
                        date: "12-5-2025",
                        query:"What is C?",
                        ans:"C is a High Level Procedural Programming Language.",
                        ansCount: 5,
                    }   
            }
        },
        methods:{
            
        },
    }
</script>
<style scoped>
    
</style>