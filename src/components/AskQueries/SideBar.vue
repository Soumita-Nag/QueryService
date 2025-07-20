<template>
  <div :class="['h-[92vh] bg-white shadow-xl p-4 fixed top-18 transition-all duration-300',isCollapsed ? 'w-10' : 'overflow-scroll w-64']">
    <button @click="toggleSidebar" class="bg-gray-300 transition-all duration-300 hover:bg-gray-400 p-1 pt-0 rounded-full cursor-pointer w-6 text-xl" :class="!isCollapsed?['fixed top-22 left-53']:['fixed top-22 left-2']" title="Toggle Sidebar">
      <span v-if="!isCollapsed">«</span>
      <span v-else>»</span>
    </button>
    <div v-if="!isCollapsed" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Your Questions</h2>
      <ul class="space-y-2">
        <li v-for="(question, index) in questions" :key="index" class="p-2 bg-white cursor-pointer" >
          <div class="truncate" :class="question.status=='pending'?'text-orange-600':question.status=='success'?'text-green-700':'text-black'">
            {{ question.question }}
          </div>
          <div class="text-gray-700 text-[0.7rem]">{{ question.date }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const questions = [
    {
        question:'What is C?', 
        date:'19.07.2025',
        status: 'pending',
    },
    {
        question:'What is C?', 
        date:'19.07.2025',
        status: 'pending',
    },
    {
        question:'What is C?', 
        date:'19.07.2025',
        status: 'pending',
    },
    {
        question:'Explain closures in JavaScript?', 
        date:'18.07.2025',
        status: 'success',
    },
    {
        question:'What is polymorphism?', 
        date:'16.07.2025',
        status: 'success',
    },
    {
        question:'Explain closures in JavaScript?', 
        date:'18.07.2025',
        status: 'success',
    },
    {
        question:'What is polymorphism?', 
        date:'16.07.2025',
        status: 'success',
    },
    {
        question:'Explain closures in JavaScript?', 
        date:'18.07.2025',
        status: 'success',
    },
    {
        question:'What is polymorphism?', 
        date:'16.07.2025',
        status: 'success',
    },
    {
        question:'Explain closures in JavaScript?', 
        date:'18.07.2025',
        status: 'success',
    },
    {
        question:'What is polymorphism?', 
        date:'16.07.2025',
        status: 'success',
    },
    {
        question:'What is C?', 
        date:'19.07.2025',
        status: 'pending',
    },
    {
        question:'What is C?', 
        date:'19.07.2025',
        status: 'pending',
    },
]
const isCollapsed = ref(true)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
</style>
