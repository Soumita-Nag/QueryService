<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';
  import Login from './components/Login.vue';
  import Signup from './components/Signup.vue';

  import { reactive,ref } from 'vue';
  const islogin=ref(false);
  const user=ref({
    uname:"soumita",
    email:"nagsoumita04@gmail.com",
  })
  const visibility=reactive({
    HomePage:true,
    AskQueries:false,
    Signup:false,
    Login:false,
  })
  const changeVisibility=(newVisibility,source)=>{
    if(source==='AskQueries'){
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=newVisibility;
    }
    if(source==='HomePage'){
      visibility.HomePage=newVisibility;
      visibility.AskQueries=!newVisibility;
    }
    if(source==='Signup'){
      visibility.Signup=newVisibility;
    }
    if(source==='Login'){
      visibility.Login=newVisibility;
    }
  }
  const checkLogin=(uId)=>{
    // alert(uId.email+" "+uId.password);
    $.ajax({
      url:"http://localhost:8000/login",
      method:"POST",
      contentType:"application/json",
      data: JSON.stringify({
        email:uId.email,
        password:uId.password
      }),
      success: (data)=>{
        console.log("Success: "+data);
      },
      error: (err)=>{
        console.log("Error: "+err);
      }
    })
  }
  const createAccount=(uId)=>{
    // alert(uId.uname+" "+uId.email+" "+uId.password);
    $.ajax({
      url:"http://localhost:8000/signup",
      method:"POST",
      contentType:"application/json",
      data: JSON.stringify({
        uname:uId.uname,
        email:uId.email,
        password:uId.password
      }),
      success: (data)=>{
        console.log("Success: "+data);
      },
      error: (err)=>{
        console.log("Error: "+err);
      }
    })
  }
</script>

<template>
  <div class="relative min-h-screen">
    <div :class="{'blur-sm pointer-events-none':visibility.Login || visibility.Signup}">
      <NavBar @activate="changeVisibility" :islogin="islogin" :user="user"/>
      <HomePage @activate="changeVisibility" v-if="visibility.HomePage" :islogin="islogin"/>
      <askQueries v-if="visibility.AskQueries" :user="user"/>
    </div>
    <div v-if="visibility.Login" class="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50">
      <Login @activate="changeVisibility" @uId="checkLogin"/>
    </div>
    <div v-if="visibility.Signup" class="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50">
      <Signup @activate="changeVisibility" @uId="createAccount"/>
    </div>
  </div>
</template>

<style scoped>

</style>
