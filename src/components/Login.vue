<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="submitLogin"
      class="w-full max-w-md bg-white shadow-lg rounded-lg px-8 mt-20 h-98"
    >
        <button @click="closeModal" class="text-3xl cursor-pointer relative left-63 text-gray-600 hover:text-red-600">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">
        Login
      </h2>

      <div class="mb-4">
        <label for="email" class="block text-gray-600 mb-1">Email</label>
        <input
          type="email" v-model="uId.email"
          name="email"
          id="email"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-4 relative">
        <label for="pwd" class="block text-gray-600 mb-1">Password</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="uId.password"
          name="pwd"
          id="pwd"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <!-- Eye icon -->
        <span
          class="absolute right-3 top-10 cursor-pointer text-gray-500"
          @click="showPassword = !showPassword"
        >
          <svg
            v-if="!showPassword"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.202-3.568M6.72 6.72a10.042 10.042 0 0114.01 14.01M3 3l18 18" />
          </svg>
        </span>
      </div>
      <div>
        <a @click="forgetPassword" class="text-sm text-blue-700 cursor-pointer">Forget password?</a>
      </div>
      <div class="flex gap-1 mb-4">
        <p class="text-sm">Don't have an account? </p>
        <a @click="showSignup" class="text-[16px] text-blue-700 cursor-pointer">create account</a>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const showPassword = ref(false);
const emit=defineEmits(['activate','uId']);
const uId={
  email:"",
  password:"",
}
const submitLogin = () => {
  emit('activate',false,'Login');
  emit('uId',uId);
};
const closeModal=()=>{
    emit('activate',false,'Login');
}
const showSignup=()=>{
    emit('activate',false,'Login');
    emit('activate',true,'Signup')
}
const forgetPassword=()=>{
  // emit('activate',false,'Login');
  emit('activate',true,'ForgetPassword');
}
</script>
<style scoped></style>
