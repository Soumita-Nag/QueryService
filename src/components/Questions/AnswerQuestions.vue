<template>
  <div class="pt-20">
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-8">
    
    <!-- Question Section -->
    <div class="space-y-4 border-b pb-4">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <span class="text-xl font-semibold text-gray-800 select-text">{{ props.query.queryTitle }}</span>
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
            <span class="flex items-center gap-1" v-if="user.islogin && user.email==query.userId+'@gmail.com'">
                <svg @click="delQuery" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6Z" />
                    <path d="M9 8H11V17H9V8ZM13 8H15V17H13V8Z" />
                </svg>
            </span>
            <span class="flex items-center gap-1" v-if="user.islogin && user.role==='admin'">
              <span @click="blockQuery(props.query.queryId)" class=" cursor-pointer">🚫</span>
            </span>

        </span>

      </div>
      
      <!-- Body -->
      <div class="text-gray-700 text-base select-text">
        {{ props.query.query }}
      </div>

      <!-- Category -->
      <div>
        <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-4" v-for="cat in props.query.category">
          {{ cat }}
        </button>
        <div class="text-xs text-gray-500 pt-2">
          {{ props.query.userId }} asked on {{ props.query.date }} at {{ props.query.time }}
        </div>
      </div>
    </div>
    
    <!-- Answers Section -->
    <div class="space-y-2 border-b pb-4">
      <div class="text-lg font-medium text-gray-800">
        {{ props.query.ansCount }} 
        {{ props.query.ansCount<= 1 ? "Answer" : "Answers" }}
      </div>
      <div class="text-gray-700 italic" v-for="(ans,index) in answers.slice(0).reverse()" v-if="props.query.ansCount>=1">
        <span class="flex justify-between w-full">
        <span class="select-text">
          {{ index+1 }}. {{ ans.answer }}
        </span>
        
        <span v-if="props.user.role==='admin'">
          <svg @click="delAns(ans)" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6Z" />
              <path d="M9 8H11V17H9V8ZM13 8H15V17H13V8Z" />
          </svg>
        </span>
        </span>
        <div class="text-xs text-gray-500 pt-2">
          {{ ans.adminId.slice(0,ans.adminId.indexOf("@")) }} answered on {{ ans.date }} at {{ ans.time }}
        </div>
        <div v-if="!ans.satisfactoryRateUpdated && user.islogin && user.email==query.userId+'@gmail.com'"  class="flex gap-4">
          <span>Are you satisfied?</span>
          <span><input type="range" min="0" max="100" v-model="rate[ans.ansId]" class=" cursor-pointer"></span>
          <span>{{ rate[ans.ansId] }}%</span>
          <span><button type="button" @click="updateSatisfactoryRate(ans.ansId)" class=" bg-green-300 font-semibold border-2 border-green-700 rounded-lg px-2 py-0.5 text-sm cursor-pointer">submit</button></span>
        </div>
      </div>
    </div>

    <!-- Your Answer Section -->
    <div class="space-y-4" v-if="props.user.islogin && props.user.role=='admin'">
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
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
const toast=useToast();
    var ans=ref("");
    const rate=ref({});
    const props=defineProps({
        user:Object,
        query:Object,
    })
    const emit=defineEmits(['answer','delQuery','delAns','blockQuery']);
    const postAnswer=()=>{
      const date=new Date();
      const day=date.getDate();
      const month=date.getMonth();
      const year=date.getFullYear();
      const currDate=day+"-"+(month+1)+"-"+year;
      const hour=(date.getHours()<=9?"0":"")+date.getHours();
      const minute=(date.getMinutes()<=9?"0":"")+date.getMinutes();
      const time=hour+":"+minute;
      const ansId=date.getTime().toString(16);
      const answer={  
        queryId:props.query.queryId,
        ansId:ansId,
        adminId:props.user.email,
        answer: ans.value,
        date: currDate,
        time: time,
        rank: 1,
        satisfactoryRate: 100.0,
        satisfactoryRateUpdated: false,
      }
      ans.value="";
      emit('answer',answer);
    }
    const delQuery=()=>{
      emit('delQuery',props.query.queryId);
    }
    const delAns=(ans)=>{
      emit('delAns',ans);
    }
    var answers=ref([]);
    const getAllAnswers=async(queryId)=>{
      $.ajax({
        url: import.meta.env.VITE_BACKEND_URL+"getAnswers?queryId=" + queryId,
        method: "GET",
        success: (data) => {
          console.log(data);
          answers.value = data;
          data.forEach(e => {
            if(!e.satisfactoryRateUpdated){
              rate.value[e.ansId]=100;
            }
          });
        },
        error: (err) => {
          console.log("Error fetching answers");
        }
      });
    }
    const blockQuery=(queryId)=>{
      emit('blockQuery',queryId);
    }
    const updateSatisfactoryRate=(id)=>{
      alert(rate.value[id]);
      $.ajax({
        url: import.meta.env.VITE_BACKEND_URL+"updateSatiesfactoryRate?ansId=" +id+"&rate="+rate.value[id],
        method: "GET",
        success: (data) => {
          toast.success("Thanks for your feedback")
        },
        error: (err) => {
          console.log("Error submitting feedback");
        }
      })
    }
    onMounted(async()=>{
      await getAllAnswers(props.query.queryId);
    })
</script>
<style scoped>
    
</style>