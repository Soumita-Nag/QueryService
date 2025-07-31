<template>
  <nav class="bg-white shadow-md fixed w-full z-50 px-6 py-4">
    <div class="flex justify-between h-10 items-center">
      <div class="text-xl font-bold text-gray-800">AskHive</div>
      <div class="hidden md:flex gap-8 text-gray-700 font-medium text-base">
        <span @click="showHome" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
        <span @click="showQuestions" class="hover:text-blue-600 cursor-pointer transition-colors" v-if="!props.user.islogin || props.user.email!=props.admin.email">Questions</span>
        <span @click="showUnAnsweresQuestions" class="hover:text-blue-600 cursor-pointer transition-colors" v-if="props.user.islogin && props.user.email==props.admin.email">Unanswered Questions</span>
        <span @click="showAnsweredQuestions" class="hover:text-blue-600 cursor-pointer transition-colors" v-if="props.user.islogin && props.user.email==props.admin.email">Answered Questions</span>
        <!-- <span @click="showContact" class="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</span> -->
      </div>
      <div class="hidden md:flex gap-6 text-gray-700 font-medium text-base items-center">
        <template v-if="!islogin">
          <span @click="showLogin" class="hover:text-green-600 cursor-pointer transition-colors">Login</span>
          <span @click="showSignup" class="hover:text-green-600 cursor-pointer transition-colors">Signup</span>
        </template>
        <template v-else>
          <span class="capitalize text-xl cursor-pointer hover:text-green-500 transition-colors">
            {{ user.uname }}
          </span>
          <span @click="logout" class="block hover:text-green-600 cursor-pointer">Logout</span>
        </template>
      </div>
      <div class="md:hidden">
        <button @click="toggleMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-3 text-gray-700 font-medium text-base">
      <span @click="showHome" class="block hover:text-blue-600 cursor-pointer">Home</span>
      <span @click="showQuestions" class="block hover:text-blue-600 cursor-pointer" v-if="props.user.email!=props.admin.email">Questions</span>
      <span @click="showUnAnsweresQuestions" class="block hover:text-blue-600 cursor-pointer" v-if="props.user.email==props.admin.email">Unanswered Questions</span>
      <span @click="showAnsweredQuestions" class="block hover:text-blue-600 cursor-pointer" v-if="props.user.email==props.admin.email">Answered Questions</span>
      <!-- <span @click="showContact" class="block hover:text-blue-600 cursor-pointer">Contact Us</span> -->
      
      <span v-if="!islogin">
        <span @click="showLogin" class="block hover:text-green-600 cursor-pointer">Login</span>
        <span @click="showSignup" class="block hover:text-green-600 cursor-pointer">Signup</span>
      </span>
      <span v-else>
        <span class="block capitalize text-xl hover:text-green-500 cursor-pointer">{{ user.uname }}</span>
        <span @click="logout" class="block hover:text-green-600 cursor-pointer">Logout</span>
      </span>
    </div>
  </nav>
</template>

<script setup>
import { defineProps,ref } from 'vue';
    const props=defineProps({
        islogin:Boolean,
        user:Object,
        admin:Object,
    })
    const emit=defineEmits(['activate','uId']);
    const showHome=()=>{
        emit('activate',true,'HomePage');
    }
    const showSignup=()=>{
        emit('activate',true,'Signup');
    }
    const showLogin=()=>{
        emit('activate',true,'Login');
    }
    const showQuestions=()=>{
      emit('activate',true,'Questions');
    }
    const mobileMenuOpen = ref(false)
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    const logout=()=>{
      emit('activate',true,'Logout');
    }
    const showUnAnsweresQuestions=()=>{
      emit('activate',true,'unAnsweredQuestions');
    }
    const showAnsweredQuestions=()=>{
      emit('activate',true,'answeredQuestions');
    }
</script>
<style scoped>
    
</style>