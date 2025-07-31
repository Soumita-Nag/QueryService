<template>
  <div class="pt-20">
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-8">
    
    <!-- Question Section -->
    <div class="space-y-4 border-b pb-4">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <span class="text-xl font-semibold text-gray-800">{{ props.query.queryTitle }}</span>
        <span class="text-sm text-gray-600 flex gap-6 items-center">
            <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {{ props.query.like }}
            </span>
            <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h10l4 4v-6a2 2 0 002-2z" />
                </svg>
                {{ props.query.ansCount }}
            </span>
            <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
                {{ props.query.views }}
            </span>
        </span>

      </div>

      <!-- Body -->
      <div class="text-gray-700 text-base">
        {{ props.query.query }}
      </div>

      <!-- Category -->
      <div>
        <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {{ props.query.category }}
        </button>
      </div>
    </div>

    <!-- Answers Section -->
    <div class="space-y-2 border-b pb-4">
      <div class="text-lg font-medium text-gray-800">
        {{ props.query.ansCount }} 
        {{ props.query.ansCount<= 1 ? "Answer" : "Answers" }}
      </div>
      <div class="text-gray-600 italic" v-if="props.query.ansCount>=1">
        {{ props.query.answer }}
      </div>
    </div>

    <!-- Your Answer Section -->
    <div class="space-y-4" v-if="props.user.islogin && props.user.email=='admin@gmail.com'">
      <h2 class="text-lg font-semibold text-gray-800">Your Answer</h2>
      <textarea placeholder="Enter Your Answer..." v-model="ans" class="w-full min-h-[120px] border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"></textarea>
      <div>
        <button @click="postAnswer" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition cursor-pointer">
          Post Your Answer
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

    var ans=ref("");
    const props=defineProps({
        user:Object,
        query:Object,
        admin:Object,
    })
    const emit=defineEmits(['answer']);
    const postAnswer=()=>{
      const date=new Date();
      const day=date.getDate();
      const month=date.getMonth();
      const year=date.getFullYear();
      const currDate=day+"-"+(month+1)+"-"+year;
      const hour=date.getHours();
      const minute=date.getMinutes();
      const time=hour+":"+minute;
      const answer={  
        queryId:props.query.queryId,
        adminId:props.admin.email,
        answer: ans.value,
        date: currDate,
        time: time,
        rank: 1,
      }
      ans.value="";
      emit('answer',answer);
    }
</script>
<style scoped>
    
</style>