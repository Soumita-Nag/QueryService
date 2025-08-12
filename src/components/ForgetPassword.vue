<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="submitForgetPassword"
      class="w-full max-w-md bg-white shadow-lg rounded-lg px-8 mt-10 h-100"
    >
        <button @click="closeModal" class="text-3xl cursor-pointer relative left-96 text-gray-600 hover:text-red-600">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">
        Account Recovery
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
  email:"",
  seqQuestionNo: 1,
  seqAns:"",
})
const closeModal=()=>{
    emit('activate',false,'ForgetPassword');
}
const submitForgetPassword=()=>{
    emit('uId',uId.value);
}
</script>
<style scoped></style>
