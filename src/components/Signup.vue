<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="submitSignup"
      class="w-full max-w-md bg-white shadow-lg rounded-lg px-8 mt-20 h-115"
    >
        <button @click="closeModal" class="text-3xl cursor-pointer relative left-54 text-gray-600 hover:text-red-600">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">
        Create an Account
      </h2>

      <div class="mb-4">
        <label for="uname" class="block text-gray-600 mb-1">Username</label>
        <input
          type="text"
          name="uname"
          id="uname"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="mb-4">
        <label for="pwd" class="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="pwd"
          id="pwd"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
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
const emit=defineEmits(['activate']);
const submitSignup = () => {
  emit('activate',false,'Signup');
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
