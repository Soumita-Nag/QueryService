<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="submitSignup"
      class="w-full max-w-md bg-white shadow-lg rounded-lg px-8 h-162"
    >
        <button @click="closeModal" class="text-3xl cursor-pointer relative left-96 text-gray-600 hover:text-red-600">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">
        Create an Account
      </h2>

      <div class="mb-4">
        <label for="uname" class="block text-gray-600 mb-1">Username</label>
        <input
          type="text" v-model="uId.uname"
          name="uname"
          id="uname"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

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
        <p class="text-[0.65rem] text-red-700">*Password must be minimum 8 characters long, including uppercase, lowercase, digits and spacial characters.</p>
      </div>
      <div class="flex flex-col mb-4 gap-4">
        <label for="seqQustion" class="block text-gray-600 mb-1">Select Security Question</label>
        <select name="seqQustion" v-model="uId.seqQuestionNo" id="seqQustion" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="1" selected>What was the name of your first pet?</option>
          <option value="2">What is the name of the street you grew up on?</option>
          <option value="3">What was the model of your first car?</option>
          <option value="4">In what city or town was your mother born?</option>
          <option value="5">What is your maternal grandmother’s first name?</option>
          <option value="6">What was the name of your first school?</option>
          <option value="7">What was your favorite subject in high school?</option>
          <option value="8">Where were you when you had your first vacation abroad?</option>
          <option value="9">Who was your childhood best friend?</option>
          <option value="10">What’s the first movie you remember watching in a theater?</option>
          <option value="11">What nickname did your family call you growing up?</option>
          <option value="12">What’s the name of the first company you worked for?</option>
          <option value="13">What was the color of the first bicycle you owned?</option>
          <option value="14">In what city did your parents meet?</option>
          <option value="15">What’s the name of your favorite teacher?</option>
        </select>
        <input type="text" v-model="uId.seqAns" placeholder="Submit answer" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
      </div>
      <div class="flex gap-1 mb-4">
        <p class="text-sm">Already have an account? </p>
        <a @click="showLogin" class="text-[16px] text-blue-700 cursor-pointer">login</a>
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
const uId=ref({
  uname:"",
  email:"",
  password:"",
  seqQuestionNo: 1,
  seqAns:"",
})
const submitSignup = () => {
  emit('activate',false,'Signup');
  emit('uId',uId);
};
const closeModal=()=>{
    emit('activate',false,'Signup');
}
const showLogin=()=>{
    emit('activate',false,'Signup');
    emit('activate',true,'Login');
}
</script>
<style scoped></style>
