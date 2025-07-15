<template>
  <div class="relative w-full">
    <div class="hidden md:block">
      <img src="@/assets/DeWatermark.ai_1751779242509.jpeg" class="w-full h-[85vh] object-cover" alt="Hero Image">
    </div>
    <div class="hidden sm:block md:hidden">
      <img src="@/assets/DeWatermark.ai_1751779242509(2).jpeg" class="w-full h-[75vh] object-cover" alt="Hero Image Tablet">
    </div>
    <div class="sm:hidden">
      <img src="@/assets/DeWatermark.ai_1751779242509(1).jpeg" class="w-full h-[60vh] object-cover" alt="Hero Image Mobile">
    </div>

    <div class="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-10 text-center bg-black/40">
      <h1 class="text-white text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">AskHive</h1>
      <h2 class="text-white text-xl sm:text-2xl italic font-semibold mb-2 drop-shadow-md">
        Ask. Answer. Learn — One Query at a Time.
      </h2>
      <p class="text-white text-sm sm:text-base max-w-2xl drop-shadow-md">
        A dedicated space to ask questions across domains and get reliable, reviewed answers from real people. Every response is verified by our admin for quality.
      </p>
      <button
        @click="goToAskQueries"
        class="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-full transition duration-300 shadow-md"
      >
        Ask Queries
      </button>
    </div>
  </div>
</template>

<script setup>
    const emit=defineEmits(['activate'])
    const goToAskQueries=()=>{
        emit('activate',true,'AskQueries');
    }
</script>
<style scoped>
    
</style>