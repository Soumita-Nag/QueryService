<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="submitLogin"
      class="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-20 h-90"
    >
        <button @click="closeModal" class="text-3xl absolute cursor-pointer left-218 top-58 text-gray-800 hover:text-red-600">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">
        Login
      </h2>

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

      <div class="mb-6">
        <label for="pwd" class="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="pwd"
          id="pwd"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
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
const submitLogin = () => {
  emit('activate',false,'Login');
};
const closeModal=()=>{
    emit('activate',false,'Login');
}
</script>
<style scoped></style>
