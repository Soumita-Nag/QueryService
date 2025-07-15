<template>
  <nav class="flex justify-between items-center px-8 py-4 bg-white shadow-md rounded-lg m-4">
    <div class="flex gap-8 text-gray-700 font-medium text-base">
      <span @click="showHome" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
      <span @click="showAbout" class="hover:text-blue-600 cursor-pointer transition-colors">About Us</span>
      <span @click="showContact" class="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</span>
    </div>
    <div class="flex gap-6 text-gray-700 font-medium text-base">
      <span class="hover:text-green-600 cursor-pointer transition-colors" @click="showLogin">Login</span>
      <span class="hover:text-green-600 cursor-pointer transition-colors" @click="showSignup">Signup</span>
    </div>
  </nav>
</template>

<script setup>
    const emit=defineEmits(['activate']);
    const showHome=()=>{
        emit('activate',true,'HomePage');
    }
    const showSignup=()=>{
        emit('activate',true,'Signup');
    }
    const showLogin=()=>{
        emit('activate',true,'Login');
    }
</script>
<style scoped>
    
</style>