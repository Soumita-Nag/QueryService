<template>
  <div class="max-w-xl sm:mx-auto p-6 mt-28 ml-10 bg-white rounded-xl shadow-lg">
    <form @submit.prevent="AddQuery" class="space-y-6">
      <div class="text-lg font-semibold text-gray-700 capitalize">
        Hello {{ props.user.uname }} 👋
      </div>
      <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-600">Select Category</label>
        <select id="category" v-model="category" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option disabled selected>Select Category</option>
          <option value="Programming">Programming</option>
          <option value="History">History</option>
          <option value="Healthcare">Healthcare</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Sports">Sports</option>
          <option value="Space Science">Space Science</option>
          <option value="Mythology">Mythology</option>
        </select>
      </div>
      <div>
        <label for="questionHead" class="block mb-2 text-sm font-medium text-gray-600">Question Title</label>
        <input type="text" name="" v-model="queryTitle" id="questionHead" placeholder="Enter the Title of your Question" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required>
      </div>
      <div>
        <label for="question" class="block mb-2 text-sm font-medium text-gray-600">Your Question</label>
        <textarea name="" v-model="query" id="question" placeholder="Ask Your Question" class="w-full min-h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required>

        </textarea>
      </div>
      <div class="text-right">
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
var category="Select Category";
var query=ref("");
var queryTitle=ref("");
const props=defineProps({
    user:Object,
})
const emit=defineEmits(['addQuery']);
const AddQuery=()=>{
    const date=new Date();
    const time=date.getTime();
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();
    const currDate=day+"-"+(month+1)+"-"+year;
    const hour=(date.getHours()<=9?"0":"")+date.getHours();
    const minute=(date.getMinutes()<=9?"0":"")+date.getMinutes();
    const currTime=hour+":"+minute;
    const queryId=time.toString(16);
    const userId=props.user.email.slice(0,props.user.email.indexOf("@"));
    const questionSchema={
      queryId:queryId,
      userId:userId,
      category:category,
      queryTitle:queryTitle.value,
      query:query.value,
      date:currDate,
      time: currTime,
      status:"Pending",
    } 
    category="Select Category";
    query.value="";
    queryTitle.value="";
    emit('addQuery',questionSchema);
    // console.log(questionSchema);
}
</script>
<style scoped>
    
</style>